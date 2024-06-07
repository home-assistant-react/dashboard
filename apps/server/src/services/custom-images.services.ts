import fs from "fs";
import * as afs from "node:fs/promises";
import * as mimetypes from "mime-types";
import path from "path";
import {
  CUSTOM_IMAGES_ALLOWED_MIME_TYPES,
  CUSTOM_IMAGES_PATH,
  CUSTOM_IMAGES_THUMBNAIL_SIZE,
  IMG_MAX_SIZE,
} from "../const";
import {
  errCustomImageNotFound,
  errCustomImageUploadFailed,
  errImageSaveFailed,
  errUploadedFileMimeTypeNotAllowed,
  errUploadedFileSizeTooLarge,
} from "@home-assistant-react/types/src/api/errors";
import { sanitizeId } from "../helpers/strings";
import { buildApiError } from "../helpers/buildApiError";
import { v4 as uuidv4 } from "uuid";
import * as ElementTree from "elementtree";
import sharp from "sharp";

export interface UploadImageOptions {
  imgContent: Buffer;
  imageFileName: string;
  imageName?: string;
}

export interface ApiDeleteCustomImageFilter {
  imageId: string;
}

export interface ApiRenameCustomImageFilter {
  imageId: string;
  newName: string;
}

const uploadCustomImage = async (options: UploadImageOptions) => {
  try {
    const img_id = uuidv4();

    const imageFolder = path.join(CUSTOM_IMAGES_PATH, img_id);
    //const imgFile = options.imgContent;
    const img_content = options.imgContent;
    const img_filename = options.imageFileName;

    const image_size = img_content.length;

    if (image_size > IMG_MAX_SIZE) {
      throw buildApiError(
        "694bbe12-a8c5-43b5-b16e-a1b29a45d567",
        errUploadedFileSizeTooLarge,
        {
          detail: `Uploaded IMG is too large. Max size is ${IMG_MAX_SIZE} bytes. Uploaded size is ${image_size} bytes.`,
        },
      );
    }

    const mime_type = mimetypes.lookup(img_filename);

    if (!mime_type || !CUSTOM_IMAGES_ALLOWED_MIME_TYPES.includes(mime_type)) {
      throw buildApiError(
        "d7eb0b4c-c117-4e9e-b6d9-b5ef8ce836bb",
        errUploadedFileMimeTypeNotAllowed,
        {
          detail: `Invalid file type. Only ${CUSTOM_IMAGES_ALLOWED_MIME_TYPES.join(", ")} are allowed. Got ${mime_type}.`,
        },
      );
    }

    const image_path: string = path.join(CUSTOM_IMAGES_PATH, img_id);

    try {
      await afs.mkdir(image_path);
    } catch (error) {
      throw buildApiError(
        "1977aada-2b98-45bb-8baa-fb5121f471a8",
        errImageSaveFailed,
        {
          detail: "Could not create image directory",
          errors: error,
        },
      );
    }

    // Determine image dimensions
    let width: number | null = null;
    let height: number | null = null;

    if (mime_type === "image/svg+xml") {
      const tree = ElementTree.parse(img_content.toString());

      // Extract width and height (could be attributes or CSS-based)
      width = parseFloat(tree.getroot().get("width") || "");
      height = parseFloat(tree.getroot().get("height") || "");

      if (width && height) {
        width =
          width && width.toString().includes("px")
            ? parseFloat(width.toString().replace("px", ""))
            : width;
        height =
          height && height.toString().includes("px")
            ? parseFloat(height.toString().replace("px", ""))
            : height;
      }
    } else {
      const metadata = await sharp(img_content).metadata();
      width = metadata.width || 0;
      height = metadata.height || 0;

      // Generate thumbnail
      await sharp(img_content)
        .resize(CUSTOM_IMAGES_THUMBNAIL_SIZE, CUSTOM_IMAGES_THUMBNAIL_SIZE, {
          fit: "cover",
          background: "transparent",
        })
        .toFile(path.join(imageFolder, "thumbnail.png"));
    }

    const image_name = path.parse(img_filename || "").name;

    const img_data = {
      id: img_id,
      file_name: img_filename,
      image_name: image_name,
      size: image_size,
      mime_type: mime_type,
      width: width,
      height: height,
    };

    await afs.writeFile(
      path.join(CUSTOM_IMAGES_PATH, img_data["id"], "info.json"),
      JSON.stringify(img_data, null, 4),
    );
    await afs.writeFile(
      path.join(CUSTOM_IMAGES_PATH, img_data["id"], img_filename),
      img_content,
    );

    return { success: true, img_data: img_data };
  } catch (error) {
    throw buildApiError(
      "cd464c98-7273-409c-8c8b-79fcb28f00a8",
      errCustomImageUploadFailed,
      {
        detail: "Something went wrong uploading the custom image",
        errors: error,
      },
    );
  }
};

const getCustomImages = async () => {
  try {
    const images: Record<string, unknown> = {};

    fs.readdirSync(CUSTOM_IMAGES_PATH).forEach((subDir: string) => {
      const subDirPath: string = path.join(CUSTOM_IMAGES_PATH, subDir);

      const infoFilePath: string = path.join(subDirPath, "info.json");
      if (fs.existsSync(infoFilePath)) {
        images[subDir] = JSON.parse(fs.readFileSync(infoFilePath, "utf-8"));
      }
    });

    return images;
  } catch (error) {
    throw buildApiError(
      "859952d9-1fe1-404e-9e96-ae68a1d4f65c",
      errCustomImageNotFound,
      {
        detail: "Could not retrieve custom images",
        errors: error,
      },
    );
  }
};

const deleteCustomImage = async (filters: ApiDeleteCustomImageFilter) => {
  const { imageId } = filters;
  const sanitizedImageId = sanitizeId(imageId);
  const imageFolder = path.join(CUSTOM_IMAGES_PATH, sanitizedImageId);
  const imageInfoPath = path.join(
    CUSTOM_IMAGES_PATH,
    sanitizedImageId,
    "info.json",
  );

  if (!fs.existsSync(imageFolder)) {
    throw buildApiError(
      "ed548e71-9349-4586-8a86-4be31a4f1154",
      errCustomImageNotFound,
      { detail: "Image folder not found" },
    );
  }

  if (!fs.existsSync(imageInfoPath)) {
    throw buildApiError(
      "21cc852f-8fe4-41a3-8e84-b7ab9808cc6d",
      errCustomImageNotFound,
      { detail: "Image file not found" },
    );
  }

  const imgInfo = JSON.parse(fs.readFileSync(imageInfoPath, "utf-8"));

  if (!imgInfo) {
    throw buildApiError(
      "41f40882-e213-4ff6-a8f6-00e982f8c364",
      errCustomImageNotFound,
      { detail: "Not a custom image" },
    );
  }

  await afs.rm(imageFolder, { recursive: true, force: true });
};

const renameCustomImage = async (imageId: string, newName: string) => {
  const cleanedId = sanitizeId(imageId);
  const filepath = path.join(CUSTOM_IMAGES_PATH, cleanedId, "info.json");

  if (!fs.existsSync(filepath)) {
    throw buildApiError(
      "25fee5c7-9060-451c-a43f-3ad741b0fada",
      errCustomImageNotFound,
      { detail: "Image not found" },
    );
  }

  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  data["image_name"] = newName;

  await afs.writeFile(filepath, JSON.stringify(data, null, 2));

  return data;
};

const getCustomImagePath = (imageId: string) => {
  const imageFolder = path.join(CUSTOM_IMAGES_PATH, imageId);
  const imageInfoPath = path.join(CUSTOM_IMAGES_PATH, imageId, "info.json");

  if (!fs.existsSync(imageFolder)) {
    throw buildApiError(
      "40404815-71d3-4d6b-9be3-da075de0d658",
      errCustomImageNotFound,
      { detail: "Missing image folder" },
    );
  }

  // Check if the file exists
  if (!fs.existsSync(imageInfoPath)) {
    throw buildApiError(
      "77b3672d-e702-48ec-8c14-947058e52b8d",
      errCustomImageNotFound,
      { detail: `Image not found: ${imageId}` },
    );
  }

  const imgInfo = JSON.parse(fs.readFileSync(imageInfoPath, "utf-8"));
  return path.join(CUSTOM_IMAGES_PATH, imageId, imgInfo.file_name);
};

const getThumbnailPath = (imageId: string) => {
  const imageFolder = path.join(CUSTOM_IMAGES_PATH, imageId);
  const imageInfoPath = path.join(CUSTOM_IMAGES_PATH, imageId, "info.json");

  if (!fs.existsSync(imageFolder)) {
    throw buildApiError(
      "881c4508-044e-40d1-9737-39f8b2639bad",
      errCustomImageNotFound,
      { detail: "Missing image folder" },
    );
  }

  // Check if the file exists
  if (!fs.existsSync(imageInfoPath)) {
    throw buildApiError(
      "7e467845-e1eb-46f6-8bab-2ab6b88d4db1",
      errCustomImageNotFound,
      { detail: `Image not found: ${imageId}` },
    );
  }

  const imgInfo = JSON.parse(fs.readFileSync(imageInfoPath, "utf-8"));

  if (imgInfo.mime_type !== "image/svg+xml") {
    return path.join(CUSTOM_IMAGES_PATH, imageId, "thumbnail.png");
  } else {
    return path.join(CUSTOM_IMAGES_PATH, imageId, imgInfo.file_name);
  }
};

export const CustomImageServices = {
  uploadCustomImage,
  getCustomImages,
  deleteCustomImage,
  renameCustomImage,
  getCustomImagePath,
  getThumbnailPath,
};
