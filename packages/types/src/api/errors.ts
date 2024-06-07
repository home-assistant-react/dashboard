import httpStatus from "http-status";
import { ErrorDetails } from "../../../../apps/server/src/config/errors/base-error";

export const errUnauthorized: ErrorDetails = {
  title: "Unauthorized",
  status: httpStatus.UNAUTHORIZED,
  code: "ERR_UNAUTHORIZED",
};

export const errNotFound: ErrorDetails = {
  title: "Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_NOT_FOUND",
};

export const errDashboardNotFound: ErrorDetails = {
  title: "Dashboard Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_DASHBOARD_NOT_FOUND",
};

export const errDashboardAlreadyExists: ErrorDetails = {
  title: "Dashboard Already Exists",
  status: httpStatus.CONFLICT,
  code: "ERR_DASHBOARD_ALREADY_EXISTS",
};

export const errUpdatingDashboard: ErrorDetails = {
  title: "Error Updating Dashboard",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_UPDATING_DASHBOARD",
};

export const errFetchingDashboards: ErrorDetails = {
  title: "Error Fetching Dashboards",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_FETCHING_DASHBOARDS",
};

export const errInvalidDashboardId: ErrorDetails = {
  title: "Invalid Dashboard ID",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_DASHBOARD_ID_INVALID",
};

export const errInvalidDashboard: ErrorDetails = {
  title: "Invalid Dashboard",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_INVALID_DASHBOARD",
};

export const errMalformedDashboard: ErrorDetails = {
  title: "Malformed Dashboard",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_MALFORMED_DASHBOARD",
};

export const errMissingName: ErrorDetails = {
  title: "Missing Name",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_MISSING_NAME",
};

export const errSvgFileSize: ErrorDetails = {
  title: "SVG File Size",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_SVG_FILE_SIZE",
};

export const errNotValidSvgFile: ErrorDetails = {
  title: "Not Valid SVG File",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_NOT_VALID_SVG_FILE",
};

export const errCustomIconNotFound: ErrorDetails = {
  title: "Custom Icon Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_CUSTOM_ICON_NOT_FOUND",
};

export const errCustomImageNotFound: ErrorDetails = {
  title: "Custom Image Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_CUSTOM_IMAGE_NOT_FOUND",
};

export const errNoUploadedImage: ErrorDetails = {
  title: "No Uploaded Image",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_NO_UPLOADED_IMAGE",
};

export const errUploadedFileSizeTooLarge: ErrorDetails = {
  title: "Uploaded File Size Too Large",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_UPLOADED_FILE_SIZE_TOO_LARGE",
};

export const errUploadedFileMimeTypeNotAllowed: ErrorDetails = {
  title: "Uploaded File Mime Type Not Allowed",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_UPLOADED_FILE_MIME_TYPE_NOT_ALLOWED",
};

export const errImageSaveFailed: ErrorDetails = {
  title: "Image Save Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_IMAGE_SAVE_FAILED",
};

export const errCustomImageUploadFailed: ErrorDetails = {
  title: "Custom Image Upload Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_CUSTOM_IMAGE_UPLOAD_FAILED",
};

export const errCustomImageReadFailed: ErrorDetails = {
  title: "Custom Image Read Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_CUSTOM_IMAGE_READ_FAILED",
};

export const errDownloadCustomImageThumbnailFailed: ErrorDetails = {
  title: "Download Custom Image Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_DOWNLOAD_CUSTOM_IMAGE_FAILED",
};

export const errDeletingCustomImage: ErrorDetails = {
  title: "Delete Custom Image Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_DELETE_CUSTOM_IMAGE_FAILED",
};

export const errRenamingCustomImage: ErrorDetails = {
  title: "Rename Custom Image Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_RENAME_CUSTOM_IMAGE_FAILED",
};

export const errCustomIconUploadFailed: ErrorDetails = {
  title: "Custom Icon Upload Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_CUSTOM_ICON_UPLOAD_FAILED",
};

export const errDeletingCustomIcon: ErrorDetails = {
  title: "Delete Custom Icon Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_DELETE_CUSTOM_ICON_FAILED",
};

export const errNoUploadedIcon: ErrorDetails = {
  title: "No Uploaded Icon",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_NO_UPLOADED_ICON",
};

export const errRenamingCustomIcon: ErrorDetails = {
  title: "Rename Custom Icon Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_RENAME_CUSTOM_ICON_FAILED",
};

export const errGetSvgDataFailed: ErrorDetails = {
  title: "Get SVG Data Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_GET_SVG_DATA_FAILED",
};

export const errNoUploadedPlugin: ErrorDetails = {
  title: "No Uploaded Plugin",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_NO_UPLOADED_PLUGIN",
};

export const errPluginUploadFailed: ErrorDetails = {
  title: "Plugin Upload Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_PLUGIN_UPLOAD_FAILED",
};

export const errPluginNotValid: ErrorDetails = {
  title: "Plugin Not Valid",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_PLUGIN_NOT_VALID",
};

export const errUnzipFailed: ErrorDetails = {
  title: "Unzip Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_UNZIP_FAILED",
};

export const errPluginPreviewNotFound: ErrorDetails = {
  title: "Plugin Preview Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_PLUGIN_PREVIEW_NOT_FOUND",
};

export const errPluginNameNotProvided: ErrorDetails = {
  title: "Plugin Name Not Provided",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_PLUGIN_NAME_NOT_PROVIDED",
};

export const errDownloadingPluginPreview: ErrorDetails = {
  title: "Downloading Plugin Preview Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_DOWNLOADING_PLUGIN_PREVIEW",
};

export const errPluginsFolderNotFound: ErrorDetails = {
  title: "Plugins Folder Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_PLUGINS_FOLDER_NOT_FOUND",
};

export const errDisablingPlugin: ErrorDetails = {
  title: "Disabling Plugin Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_DISABLING_PLUGIN",
};

export const errEnablingPlugin: ErrorDetails = {
  title: "Enabling Plugin Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_ENABLING_PLUGIN",
};

export const errGettingPluginScriptCode: ErrorDetails = {
  title: "Getting Plugin Code Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_GETTING_PLUGIN_CODE",
};

export const errUninstallingPlugin: ErrorDetails = {
  title: "Uninstalling Plugin Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_UNINSTALLING_PLUGIN",
};

export const errExportFailed: ErrorDetails = {
  title: "Export Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_EXPORT_FAILED",
};

export const errNoRestoreBackupFile: ErrorDetails = {
  title: "No Restore Backup File",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_NO_RESTORE_BACKUP_FILE",
};

export const errBackupRestoreFailed: ErrorDetails = {
  title: "Backup Restore Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_BACKUP_RESTORE_FAILED",
};

export const errInvalidAuthKey: ErrorDetails = {
  title: "Invalid Auth Key",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_INVALID_AUTH_KEY",
};

export const errIntegrationAuthStartFailed: ErrorDetails = {
  title: "Integration Auth Start Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_INTEGRATION_AUTH_START_FAILED",
};

export const errIntegrationAuthNotFound: ErrorDetails = {
  title: "Integration Auth Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_INTEGRATION_AUTH_NOT_FOUND",
};

export const errIntegrationAuthWrongCredentials: ErrorDetails = {
  title: "Integration Auth Wrong Credentials",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_INTEGRATION_AUTH_WRONG_CREDENTIALS",
};

export const errIntegrationAuthNotStarted: ErrorDetails = {
  title: "Integration Auth Not Started",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_INTEGRATION_AUTH_NOT_STARTED",
};

export const errIntegrationSecretKeyNotProvided: ErrorDetails = {
  title: "Integration Secret Key Not Provided",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_INTEGRATION_SECRET_KEY_NOT_PROVIDED",
};

export const errIntegrationReturnCodeNotProvided: ErrorDetails = {
  title: "Integration Return Code Not Provided",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_INTEGRATION_RETURN_CODE_NOT_PROVIDED",
};

export const errGoogleNoAuthTokenReceived: ErrorDetails = {
  title: "Google No Auth Token Received",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_GOOGLE_NO_AUTH_TOKEN_RECEIVED",
};

export const errCloudIntegrationNotFound: ErrorDetails = {
  title: "Cloud Integration Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_CLOUD_INTEGRATION_NOT_FOUND",
};

export const errCloudIntegrationDeleteFailed: ErrorDetails = {
  title: "Cloud Integration Delete Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_CLOUD_INTEGRATION_DELETE_FAILED",
};

export const errGoogleIntegrationInvalidClientId: ErrorDetails = {
  title: "Google Integration Invalid Client ID",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_GOOGLE_INTEGRATION_INVALID_CLIENT_ID",
};

export const errGoogleIntegrationInvalidClientSecret: ErrorDetails = {
  title: "Google Integration Invalid Client Secret",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_GOOGLE_INTEGRATION_INVALID_CLIENT_SECRET",
};

export const errGoogleIntegrationInvalidRefreshToken: ErrorDetails = {
  title: "Google Integration Invalid Refresh Token",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_GOOGLE_INTEGRATION_INVALID_REFRESH_TOKEN",
};

export const errIntegrationGetAlbumFailed: ErrorDetails = {
  title: "Integration Get Album Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_INTEGRATION_GET_ALBUM_FAILED",
};

export const errIntegrationsInvalidPhotoId: ErrorDetails = {
  title: "Integrations Invalid Photo ID",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_INTEGRATIONS_INVALID_PHOTO_ID",
};

export const errIntegrationMissingAlbumId: ErrorDetails = {
  title: "Integration Missing Album ID",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_INTEGRATION_MISSING_ALBUM_ID",
};

export const errIntegrationTypeNotFound: ErrorDetails = {
  title: "Integration Type Not Found",
  status: httpStatus.NOT_FOUND,
  code: "ERR_INTEGRATION_TYPE_NOT_FOUND",
};

export const errIntegrationGetPhotoFailed: ErrorDetails = {
  title: "Integration Get Photo Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_INTEGRATION_GET_PHOTO_FAILED",
};

export const errGoogleIntegrationNoPhotoUrl: ErrorDetails = {
  title: "Google Integration No Photo URL",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_GOOGLE_INTEGRATION_NO_PHOTO_URL",
};

export const errIntegrationGetPhotosFailed: ErrorDetails = {
  title: "Integration Get Photos Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_INTEGRATION_GET_PHOTOS_FAILED",
};

export const errNoAlbumProvided: ErrorDetails = {
  title: "No Album Provided",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_NO_ALBUM_PROVIDED",
};

export const errIntegrationGetRandomPhotosFailed: ErrorDetails = {
  title: "Integration Get Random Photos Failed",
  status: httpStatus.INTERNAL_SERVER_ERROR,
  code: "ERR_INTEGRATION_GET_RANDOM_PHOTOS_FAILED",
};

export const errNoIntegrationAuthStarted: ErrorDetails = {
  title: "No Integration Auth Started",
  status: httpStatus.BAD_REQUEST,
  code: "ERR_NO_INTEGRATION_AUTH_STARTED",
};
