import {
  ApiDeleteCustomImageInput,
  ApiRenameCustomImageInput,
  apiRenameCustomImageSchema,
  ImageUploadInput,
  uploadImageSchema,
} from "@home-assistant-react/types/src/api/schemas/custom-images";
import fileUpload from "express-fileupload";
import {
  errCustomImageUploadFailed,
  errDeletingCustomImage,
  errDownloadCustomImageThumbnailFailed,
  errNoUploadedImage,
  errRenamingCustomImage,
} from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "../helpers/buildApiError";
import { defineController } from "../helpers/defineController";

import { sanitizeId } from "../helpers/strings";
import { CustomImageServices } from "../services/custom-images.services";
import { validate } from "../helpers/validators/validate";

const getCustomImages = defineController(async () => {
  return await CustomImageServices.getCustomImages();
});

const uploadImage = defineController<ImageUploadInput>(async ({ request }) => {
  try {
    if (!request!.files || !request!.files.img_file) {
      throw buildApiError(
        "6b1b4e60-8db1-40b0-b090-6501cb750f63",
        errNoUploadedImage,
      );
    }

    const imgFile = request!.files.img_file as fileUpload.UploadedFile;
    const img_content = imgFile.data;
    const img_filename = imgFile.name;

    const imageData = await CustomImageServices.uploadCustomImage({
      imgContent: img_content,
      imageFileName: img_filename,
    });

    return { success: true, imageData };
  } catch (error) {
    throw buildApiError(
      "434a3138-eb6c-47f1-b553-93cf8249ca61",
      errCustomImageUploadFailed,
      {
        detail: "Something went wrong uploading the custom image",
        errors: error,
      },
    );
  }
}, validate(uploadImageSchema));

const deleteCustomImage = defineController<ApiDeleteCustomImageInput>(
  async ({ request }) => {
    try {
      const sanitized_image_id = sanitizeId(request!.params.imageId);
      await CustomImageServices.deleteCustomImage({
        imageId: sanitized_image_id,
      });

      return { success: true };
    } catch (error) {
      throw buildApiError(
        "570be509-ed1b-4ce8-adac-18c3dbec54ae",
        errDeletingCustomImage,
      );
    }
  },
);

const renameCustomImage = defineController<ApiRenameCustomImageInput>(
  async ({ request }) => {
    try {
      const sanitized_image_id = sanitizeId(request!.params.imageId);
      return CustomImageServices.renameCustomImage(
        sanitized_image_id,
        request?.body.name || "",
      );
    } catch (err) {
      throw buildApiError(
        "2b4cebf3-9061-434f-9723-5ae012014817",
        errRenamingCustomImage,
        { errors: err },
      );
    }
  },
  validate(apiRenameCustomImageSchema),
);

const downloadThumbnail = defineController(async ({ request, response }) => {
  try {
    const sanitized_image_id = sanitizeId(request!.params.imageId);
    const thumbnailPath =
      CustomImageServices.getThumbnailPath(sanitized_image_id);

    response?.download(thumbnailPath);
  } catch (error) {
    throw buildApiError(
      "a8e10a6e-29a7-41b5-aac0-f13e63f35000",
      errDownloadCustomImageThumbnailFailed,
      { errors: error },
    );
  }
});

const downloadImage = defineController(async ({ request, response }) => {
  try {
    const sanitized_image_id = sanitizeId(request!.params.imageId);
    const customImagePath =
      CustomImageServices.getCustomImagePath(sanitized_image_id);

    response?.download(customImagePath);
  } catch (error) {
    throw buildApiError(
      "a9352496-f8ed-440d-ab11-458b99d815e3",
      errDownloadCustomImageThumbnailFailed,
      { errors: error },
    );
  }
});

export const CustomImageControllers = {
  uploadImage,
  getCustomImages,
  deleteCustomImage,
  renameCustomImage,
  downloadThumbnail,
  downloadImage,
};
