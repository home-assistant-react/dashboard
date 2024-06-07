import {
  AuthData,
  CustomSvgIcons,
  DashboardState,
  Dict,
  LS_HASS_AUTH_TOKEN_KEY,
} from "@home-assistant-react/types/src";
import {
  DashboardCreateInput,
  DashboardsListResult,
} from "@home-assistant-react/types/src/api/dashboards";
import { GetRandomPhotosOutput } from "@home-assistant-react/types/src/api/schemas/cloud-integrations";
import { PluginInfo } from "@home-assistant-react/types/src/providers/plugins-state";
import { CustomImages } from "@home-assistant-react/types/src/ui/custom-images";
import moment from "moment/moment";
import axios, { AxiosInstance } from "axios";
import {
  AlbumValue,
  CloudIntegrations,
  PhotoAlbum,
} from "@home-assistant-react/types/src/api";
import { saveAs } from "file-saver";

type PartialAuthData = Pick<
  AuthData,
  "access_token" | "expires_in" | "token_type"
>;
import qs from "qs";
import { FileUploader, FileUploaderOptions } from "../helpers/file-uploader";

export class ApiClient {
  private handler: AxiosInstance;
  public apiBaseUrl: string = "";
  public internalUrl: string = "";
  constructor(public authData: AuthData) {
    this.apiBaseUrl = "/v1";
    this.internalUrl = this.getBaseUrl() || "";
    this.handler = axios.create({
      baseURL: this.internalUrl,
      headers: {
        Authorization: `Bearer ${this.authData.access_token}`,
      },
    });
  }

  public getUrl(url?: string, queryParams?: Dict, integrationName?: string) {
    const baseUrl = this.getBaseUrl() || "";
    const apiUrl = integrationName
      ? `/integrations/${integrationName}`
      : baseUrl;
    const queryString = queryParams ? `?${qs.stringify(queryParams)}` : "";
    return `${apiUrl}${url || ""}${queryString}`;
  }

  public async getAuthToken(): Promise<AuthData | undefined | null> {
    if (this.authData.expires === -1) {
      return this.authData;
    }

    if (moment(this.authData.expires || 0).diff(moment()) <= 0) {
      return await this.refreshAuthToken(
        this.authData.refresh_token || "",
        this.authData.clientId || "",
      );
    }

    return this.authData;
  }

  public async refreshAuthToken(
    refreshToken: string,
    clientId: string,
  ): Promise<PartialAuthData | null> {
    const requestData = new FormData();
    requestData.append("grant_type", "refresh_token");
    requestData.append("refresh_token", refreshToken);
    requestData.append("client_id", clientId);

    const newToken = await axios
      .create({
        baseURL: this.authData.hassUrl,
        headers: {
          //Authorization: `Bearer ${this.authData.access_token}`,
        },
      })
      .post<PartialAuthData>("/auth/token", requestData);

    if (!newToken?.data) return null;

    const newAuthData: AuthData = {
      ...this.authData,
      access_token: newToken.data.access_token,
      expires_in: newToken.data.expires_in,
      expires: moment().add(newToken.data.expires_in, "seconds").unix(),
      token_type: newToken.data.token_type,
    };

    window.localStorage.setItem(
      LS_HASS_AUTH_TOKEN_KEY,
      JSON.stringify(newAuthData),
    );

    this.authData = newAuthData;

    return newToken.data;
  }

  public async getHandler(): Promise<AxiosInstance> {
    await this.getAuthToken();

    this.handler = axios.create({
      baseURL: this.getBaseUrl(),
      headers: {
        Authorization: `Bearer ${this.authData.access_token}`,
      },
    });

    return this.handler;
  }

  public getHassBaseUrl(internalIfAvailable?: boolean) {
    return internalIfAvailable && this.internalUrl
      ? this.internalUrl
      : this.authData.hassUrl;
  }

  public getBaseUrl() {
    if (
      // @ts-ignore
      (import.meta as unknown as Record<string, { MODE: string }>).env.MODE ===
      "development"
    ) {
      return "http://localhost:8099/v1";
    }

    return window.__react_dashboard_api_url__;
  }

  public async startIntegrationLogin(integrationName: string, data: Dict) {
    const handler = await this.getHandler();
    const result = await handler.post<{ started: boolean; login_uri: string }>(
      `/integrations/${integrationName}/auth/start`,
      data,
    );

    return result.data;
  }
  public async cancelIntegrationAuth(integrationName: string, authKey: string) {
    const handler = await this.getHandler();
    const result = await handler.post<{ cancelled: boolean }>(
      `/integrations/${integrationName}/auth/cancel`,
      { auth_key: authKey },
    );

    return result.data;
  }
  public async getAvailableIntegrations(allowedTypes?: string[]) {
    const handler = await this.getHandler();
    const result = await handler.post<CloudIntegrations>("/integrations", {
      allowedTypes,
    });

    return result.data;
  }

  public async getAlbums(integrationName: string, authKey: string) {
    const handler = await this.getHandler();
    const result = await handler.get<PhotoAlbum[]>(
      `/integrations/${integrationName}/photos/albums`,
      {
        params: { auth_key: authKey },
      },
    );

    return result.data;
  }

  public async getPhotoByUrl(url: string) {
    const handler = await this.getHandler();
    const result = await handler.get<Blob>(url, { responseType: "blob" });
    return result.data;
  }

  public async getRandomPhotos(albums: AlbumValue[], maxItems?: number) {
    const handler = await this.getHandler();
    const result = await handler.post<GetRandomPhotosOutput>(
      "/integrations/photos/random",
      {
        max_items: maxItems,
        albums: albums.map((album) => ({
          ...album,
          auth_key: album.auth_key,
        })),
      },
    );

    return result.data;
  }

  public async getCustomIconUploader(options?: FileUploaderOptions) {
    const handler = await this.getHandler();
    return new FileUploader(handler, "/custom-icons/upload", {
      fileFieldName: "svg_file",
      ...options,
    });
  }

  public async getCustomImageUploader(options?: FileUploaderOptions) {
    const handler = await this.getHandler();
    return new FileUploader(handler, "/custom-images/upload", {
      fileFieldName: "img_file",
      ...options,
    });
  }

  public async getPluginUploader(options?: FileUploaderOptions) {
    const handler = await this.getHandler();
    return new FileUploader(handler, "/plugins/upload", {
      fileFieldName: "plugin_file",
      ...options,
    });
  }

  public async getCustomIcons() {
    const handler = await this.getHandler();
    const result = await handler.get<CustomSvgIcons>("/custom-icons");

    return result.data;
  }

  public async getCustomImages() {
    const handler = await this.getHandler();
    const result = await handler.get<CustomImages>("/custom-images");

    return result.data;
  }

  public async getAvailableDashboards() {
    const handler = await this.getHandler();
    const result = await handler.get<DashboardsListResult>("/dashboards");
    return result.data;
  }

  public async getDashboard(dashboardId: string) {
    const handler = await this.getHandler();
    const result = await handler.get<{ data: DashboardState }>(
      `/dashboards/${dashboardId}`,
    );
    return result.data;
  }

  public async createDashboard(dashboard: DashboardCreateInput) {
    const handler = await this.getHandler();
    const result = await handler.post("/dashboards", dashboard);
    return result.data;
  }

  public async updateDashboard(dashboardId: string, dashboard: DashboardState) {
    const handler = await this.getHandler();
    const result = await handler.patch(`/dashboards/${dashboardId}`, dashboard);
    return result.data;
  }

  public async getPlugins() {
    const handler = await this.getHandler();
    const result = await handler.get<{ plugins: Record<string, PluginInfo> }>(
      "/plugins",
    );
    return result.data;
  }

  public async deleteCustomIcon(iconId: string) {
    const handler = await this.getHandler();
    const result = await handler.delete(`/custom-icons/${iconId}`);
    return result.data;
  }

  public async deleteCustomImage(iconId: string) {
    const handler = await this.getHandler();
    const result = await handler.delete(`/custom-images/${iconId}`);
    return result.data;
  }

  public async renameCustomIcon(iconId: string, newName: string) {
    const handler = await this.getHandler();
    const result = await handler.patch(`/custom-icons/${iconId}/name`, {
      name: newName,
    });
    return result.data;
  }

  public async renameCustomImage(iconId: string, newName: string) {
    const handler = await this.getHandler();
    const result = await handler.patch(`/custom-images/${iconId}/name`, {
      name: newName,
    });
    return result.data;
  }

  public async deleteIntegration(integration: string, integrationId: string) {
    const handler = await this.getHandler();
    const result = await handler.delete(
      `/integrations/${integration}/${integrationId}`,
    );
    return result.data;
  }

  public async deleteDashboard(dashboardId: string) {
    const handler = await this.getHandler();
    const result = await handler.delete(`/dashboards/${dashboardId}`);
    return result.data;
  }

  public async disablePlugin(pluginId: string) {
    const handler = await this.getHandler();
    const result = await handler.patch(`/plugins/${pluginId}/disable`);
    return result.data;
  }

  public async enablePlugin(pluginId: string) {
    const handler = await this.getHandler();
    const result = await handler.patch(`/plugins/${pluginId}/enable`);
    return result.data;
  }

  public async uninstallPlugin(pluginId: string) {
    const handler = await this.getHandler();
    const result = await handler.delete(`/plugins/${pluginId}/uninstall`);
    return result.data;
  }

  public async downloadFullBackup() {
    const handler = await this.getHandler();
    const result = await handler.post(
      "/export/all",
      {},
      { responseType: "blob" },
    );
    saveAs(result.data, "full_backup.zip");
  }

  public async uploadFullBackup(file: File) {
    const handler = await this.getHandler();
    const formData = new FormData();
    formData.append("backup_file", file);
    const result = await handler.post("/import/all", formData);
    return result.data;
  }

  public async downloadJsonFile(data: object, fileName: string) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, fileName);
  }
}
