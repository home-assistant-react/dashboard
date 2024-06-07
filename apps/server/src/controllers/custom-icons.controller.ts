import {
  ApiDeleteCustomIconInput,
  ApiRenameCustomIconInput,
  apiRenameCustomIconSchema,
  IconUploadInput,
  uploadIconSchema,
} from "@home-assistant-react/types/src/api/schemas/custom-icons";
import fileUpload from "express-fileupload";
import {
  errCustomIconUploadFailed,
  errDeletingCustomIcon,
  errNoUploadedIcon,
  errRenamingCustomIcon,
} from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "../helpers/buildApiError";
import { defineController } from "../helpers/defineController";

import { sanitizeId } from "../helpers/strings";
import { CustomIconServices } from "../services/custom-icons.services";
import { validate } from "../helpers/validators/validate";

export const getCustomIcons = defineController(async () => {
  return await CustomIconServices.getCustomIcons();
});

export const uploadIcon = defineController<IconUploadInput>(
  async ({ request }) => {
    try {
      if (!request!.files || !request!.files.svg_file) {
        throw buildApiError(
          "c1c6a6d7-575a-4cf6-bf84-567ac9a16c34",
          errNoUploadedIcon,
        );
      }

      const svgFile = request!.files.svg_file as fileUpload.UploadedFile;
      const img_content = svgFile.data;
      const img_filename = svgFile.name;

      const iconData = await CustomIconServices.uploadCustomIcon({
        svgContent: img_content,
        svgFilename: img_filename,
      });

      return { success: true, iconData };
    } catch (error) {
      throw buildApiError(
        "a6ebe61e-c79b-4b5a-a12a-eea367e5670c",
        errCustomIconUploadFailed,
        {
          detail: "Something went wrong uploading the custom icon",
          errors: error,
        },
      );
    }
  },
  validate(uploadIconSchema),
);

export const deleteCustomIcon = defineController<ApiDeleteCustomIconInput>(
  async ({ request }) => {
    try {
      const sanitized_icon_id = sanitizeId(request!.params.iconId);
      await CustomIconServices.deleteCustomIcon({
        iconId: sanitized_icon_id,
      });

      return { success: true };
    } catch (error) {
      throw buildApiError(
        "570be509-ed1b-4ce8-adac-18c3dbec54ae",
        errDeletingCustomIcon,
      );
    }
  },
);

export const renameCustomIcon = defineController<ApiRenameCustomIconInput>(
  async ({ request }) => {
    try {
      const sanitized_icon_id = sanitizeId(request!.params.iconId);
      return CustomIconServices.renameCustomIcon(
        sanitized_icon_id,
        request?.body.name || "",
      );
    } catch (err) {
      throw buildApiError(
        "2b4cebf3-9061-434f-9723-5ae012014817",
        errRenamingCustomIcon,
        { errors: err },
      );
    }
  },
  validate(apiRenameCustomIconSchema),
);

export const CustomIconControllers = {
  uploadIcon,
  getCustomIcons,
  deleteCustomIcon,
  renameCustomIcon,
};
