import { Google } from "../cloud-integrations/google";

export const getIntegrationHandler = (integration: string) => {
  switch (integration) {
    case "google":
      return new Google();
    /*case "dropbox":
            return new DropboxIntegrationHandler();
          case "onedrive":
            return new OneDriveIntegrationHandler();
          case "box":
            return new BoxIntegrationHandler();
          case "picasa":
            return new PicasaIntegrationHandler();
          case "flickr":
            return new FlickrIntegrationHandler();
          case "smugmug":
            return new SmugMugIntegrationHandler();
          case "500px":
            return new FiveHundredPxIntegrationHandler();
          case "instagram":
            return new InstagramIntegrationHandler();
          case "facebook":
            return new FacebookIntegrationHandler();
          case "vk":
            return new VkIntegrationHandler();
          case "yandex":
            return new YandexIntegrationHandler();
          case "imgur":
            return new ImgurIntegrationHandler();
          case "cloudinary":
            return new CloudinaryIntegrationHandler();
          case "shutterstock":
            return new ShutterstockIntegrationHandler();
          case "unsplash":
            return new UnsplashIntegrationHandler();
          case "pixabay":
            return new PixabayIntegrationHandler();
          case "giphy":
            return new GiphyIntegrationHandler();
          case "tenor":
            return new TenorIntegrationHandler();
          case "gdrive":
            return new GDriveIntegrationHandler();
          case "onedrive_business":
            return new OneDriveBusinessIntegrationHandler();
          case "pcloud":
            return new PCloudIntegrationHandler();
          case "s3":
            return new S3IntegrationHandler();
          case "webdav":
            return new WebDavIntegrationHandler();
          case "sftp":
            return new SftpIntegrationHandler();
          case "ftp":
            return new FtpIntegrationHandler();
          case "azure_blob":
            return new AzureBlobIntegrationHandler();
          case "azure_file":
            return new AzureFileIntegrationHandler();
          case "backblaze":
            return new BackblazeIntegrationHandler();
          case "b2":
            return new B2IntegrationHandler();
          case "wasabi":
            return new WasabiIntegrationHandler();
          case "digitalocean_spaces":
            return new DigitalOceanSpacesIntegrationHandler();
          case "minio":
            return new MinioIntegrationHandler();
          case "s3_compatible":
            return new S3CompatibleIntegrationHandler();
          case "google_cloud_storage":
            return new GoogleCloudStorageIntegrationHandler();*/
  }
};
