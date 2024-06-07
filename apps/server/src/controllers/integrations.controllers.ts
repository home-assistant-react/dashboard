import {
  AuthCancelInput,
  authCancelSchema,
  AuthStartInput,
  authStartSchema,
  CloudIntegrationAuthCancelOutput,
  CloudIntegrationAuthStartOutput,
  CloudIntegrationGetAlbumsOutput,
  CloudIntegrationGetPhotosInAlbumOutput,
  GetIntegrationsInput,
  GetIntegrationsOutput,
  getIntegrationsSchema,
  GetPhotosInAlbumInput,
  getPhotosInAlbumSchema,
  GetRandomPhotosInput,
  GetRandomPhotosOutput,
  getRandomPhotosSchema,
} from "@home-assistant-react/types/src/api/schemas/cloud-integrations";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { PUBLIC_PATH } from "../const";
import {
  errCloudIntegrationDeleteFailed,
  errIntegrationAuthNotFound,
  errIntegrationAuthNotStarted,
  errIntegrationAuthStartFailed,
  errIntegrationAuthWrongCredentials,
  errIntegrationGetAlbumFailed,
  errIntegrationGetPhotoFailed,
  errIntegrationGetPhotosFailed,
  errIntegrationGetRandomPhotosFailed,
  errIntegrationMissingAlbumId,
  errIntegrationReturnCodeNotProvided,
  errIntegrationSecretKeyNotProvided,
  errIntegrationsInvalidPhotoId,
  errIntegrationTypeNotFound,
  errInvalidAuthKey,
  errNoAlbumProvided,
} from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "../helpers/buildApiError";
import { defineController } from "../helpers/defineController";
import { getIntegrationHandler } from "../helpers/getIntegrationHandler";
import { getServerBaseUrl } from "../helpers/getServerBaseUrl";
import { getAllPhotosInAlbum } from "../helpers/photos";
import { isValidAuthToken } from "../helpers/strings";
import { IntegrationServices } from "../services/integrations.services";
import { validate } from "../helpers/validators/validate";

const authStart = defineController<AuthStartInput>(async ({ request }) => {
  try {
    const authKey = request?.body.auth_key || uuidv4();
    const clientID = request?.body.client_id || "";
    const clientSecret = request?.body.client_secret || "";
    const integrationName = request?.params.integrationName || "";

    if (!isValidAuthToken(authKey)) {
      throw buildApiError(
        "42f389c2-7f49-4621-95b8-7c32d1d2389b",
        errInvalidAuthKey,
      );
    }

    if (!integrationName) {
      throw buildApiError(
        "a7d05fcb-2889-48b2-829b-608ada5fe35f",
        errIntegrationTypeNotFound,
        {
          detail: "No integration provided",
        },
      );
    }

    const integration = getIntegrationHandler(integrationName);

    if (!integration) {
      throw buildApiError(
        "a70b60e5-189f-4e13-9a6e-5e643941fe7b",
        errIntegrationTypeNotFound,
        {
          detail: `No integration found for the ${integrationName} type.`,
        },
      );
    }

    const redirectURI =
      request?.body.redirect_uri ||
      (await getServerBaseUrl(request!, true)) +
        (await integration.getRedirectUrl());

    const secretKey = uuidv4();

    const authData = IntegrationServices.startAuth({
      started: true,
      secretKey,
      origin: request?.headers.origin || "",
      authId: authKey,
      startedTime: new Date(),
      type: integration.integrationName,
      authData: {
        clientId: clientID,
        clientSecret: clientSecret,
        redirectUri: redirectURI,
      },
    });

    const login_uri = await integration.getLoginUrl(authData);
    const baseUrl = await getServerBaseUrl(request!);

    return {
      started: true,
      authData,
      login_uri: `${baseUrl}${login_uri}`,
    } satisfies CloudIntegrationAuthStartOutput;
  } catch (error) {
    throw buildApiError(
      "9ec9bb7b-ceb8-4712-8bec-d160ed48bb5a",
      errIntegrationAuthStartFailed,
      {
        detail: "Failed to start auth. Please try again later.",
        errors: error,
      },
    );
  }
}, validate(authStartSchema));

const getIntegrations = defineController<GetIntegrationsInput>(
  async ({ request }) => {
    const integrations = await IntegrationServices.getIntegrations({
      types: request?.body.allowedTypes,
    });

    return { integrations } satisfies GetIntegrationsOutput;
  },
  validate(getIntegrationsSchema),
);

const deleteIntegration = defineController(async ({ request }) => {
  try {
    await IntegrationServices.deleteIntegration(request?.params?.authId);
    return { deleted: true };
  } catch (error) {
    throw buildApiError(
      "81592763-08a2-43b2-b46c-5e868e18dbb7",
      errCloudIntegrationDeleteFailed,
      {
        errors: error,
      },
    );
  }
});

const getRandomPhotos = defineController<GetRandomPhotosInput>(
  async ({ request }) => {
    try {
      const albums = request?.body.albums || [];
      const maxItems = Number(request?.body.maxItems || 20);

      if (!Array.isArray(albums) || albums.length === 0) {
        throw buildApiError(
          "270e5c91-dc0e-4cc6-9d86-15c8e33d4ec2",
          errNoAlbumProvided,
          {
            detail: "No albums provided",
          },
        );
      }

      const photos = [];

      for await (const album of albums) {
        const albumId = album.album_id;
        const authKey = album.auth_key;
        const integrationName = album.integration;
        const integration = getIntegrationHandler(integrationName);

        if (!integration) {
          throw buildApiError(
            "db1b852b-5270-4aeb-a218-a0eb8809b5ec",
            errIntegrationTypeNotFound,
            {
              detail: "No integration found",
            },
          );
        }

        if (!albumId) {
          throw buildApiError(
            "5a68d786-8ef4-43f9-9bf0-7f7f3fd02631",
            errIntegrationMissingAlbumId,
            {
              detail: "No album id found",
            },
          );
        }

        const auth = await IntegrationServices.getIntegration(authKey);

        if (!auth) {
          throw buildApiError(
            "15da771f-f1e1-4521-92b3-342bfb26906b",
            errIntegrationAuthNotFound,
            {
              detail: "No integration found with the given key",
            },
          );
        }

        try {
          const albumPhotos = await getAllPhotosInAlbum({
            albumId,
            auth,
            integration,
          });
          photos.push(...albumPhotos);
        } catch (error) {}
      }

      const randomPhotos = photos
        .sort(() => 0.5 - Math.random())
        .slice(0, maxItems);

      return {
        photos: randomPhotos,
        totalPhotos: randomPhotos.length,
      } satisfies GetRandomPhotosOutput;
    } catch (error) {
      throw buildApiError(
        "158f49c3-dcff-4bdd-975b-0b06fc2a2b69",
        errIntegrationGetRandomPhotosFailed,
        {
          detail: "Something went wrong fetching random photos",
          errors: error,
        },
      );
    }
  },
  validate(getRandomPhotosSchema),
);

const authRedirect = defineController(async ({ request, response }) => {
  const integrationName = request?.params.integrationName || "";

  if (!integrationName) {
    throw buildApiError(
      "fae28a37-37e9-4142-b8f8-7001b72675f6",
      errIntegrationTypeNotFound,
      {
        detail: "No integration provided",
      },
    );
  }

  const integration = getIntegrationHandler(integrationName);

  if (!integration) {
    throw buildApiError(
      "eb8b9161-fd43-4b7d-b1bd-8558cefbdf30",
      errIntegrationTypeNotFound,
      {
        detail: `No integration found for the ${integrationName} type.`,
      },
    );
  }

  const redirectData = integration.getRedirectQueryData(request as never);
  if (!redirectData.authId) {
    throw buildApiError(
      "914ab1d8-bc71-481f-aa14-9df5d63eb703",
      errInvalidAuthKey,
    );
  }

  if (!redirectData.cloudCode) {
    throw buildApiError(
      "12d448d9-e7aa-4e6c-b878-88152f978ba0",
      errIntegrationReturnCodeNotProvided,
    );
  }

  if (!redirectData.secretKey) {
    throw buildApiError(
      "804c760c-9e76-4f55-9e16-7eec6dc756e5",
      errIntegrationSecretKeyNotProvided,
      {
        detail: "No secret key found",
      },
    );
  }

  if (!redirectData.secretKey) {
    throw buildApiError(
      "804c760c-9e76-4f55-9e16-7eec6dc756e5",
      errIntegrationSecretKeyNotProvided,
      {
        detail: "No secret key found",
      },
    );
  }

  const auth = IntegrationServices.getStartedAuth(redirectData.authId);

  if (!auth) {
    throw buildApiError(
      "a637e887-97e1-44f7-917f-feadb1af98b2",
      errIntegrationAuthNotFound,
      {
        detail: "No auth started with the given key",
      },
    );
  }

  if (auth.secretKey !== redirectData.secretKey) {
    throw buildApiError(
      "d5327154-1186-48d9-8187-daa0103e3e1f",
      errIntegrationAuthWrongCredentials,
      {
        detail: "Invalid secret key",
      },
    );
  }

  const result = await integration.completeAuth(auth, redirectData);
  await IntegrationServices.saveAuth(auth, result);

  let html = fs
    .readFileSync(path.join(PUBLIC_PATH, "login_complete.html"), {
      encoding: "utf-8",
    })
    .toString();

  html = html.replace("{{%AUTH_ID%}}", auth.authId);
  html = html.replace("{{%ORIGIN%}}", auth.origin);

  response?.send(html.toString());
  IntegrationServices.closeAuth(redirectData.authId);
});

const authLogin = defineController(async ({ request, response }) => {
  const authKey = request?.query.k || "";
  const secretKey = request?.query.s || "";
  const auth = IntegrationServices.getStartedAuth(String(authKey));
  const integrationName = request?.params.integrationName || "";

  if (!integrationName) {
    throw buildApiError(
      "ea1575ad-eb04-42a1-bbdb-1b12e9c20612",
      errIntegrationTypeNotFound,
      {
        detail: "No integration provided",
      },
    );
  }

  const integration = getIntegrationHandler(integrationName);

  if (!integration) {
    throw buildApiError(
      "67ee8f0b-aa60-4752-a2ff-ec32b43b6920",
      errIntegrationTypeNotFound,
      {
        detail: `No integration found for the ${integrationName} type.`,
      },
    );
  }

  if (!authKey) {
    throw buildApiError(
      "40025b68-6b84-4ebe-b80e-df8f3f9591ed",
      errInvalidAuthKey,
    );
  }

  if (!auth) {
    throw buildApiError(
      "ca82c85b-f833-4945-ae90-62d4b6dbc231",
      errIntegrationAuthNotFound,
      {
        detail: "No auth started with the given key. Please try again.",
      },
    );
  }

  if (auth.secretKey !== secretKey) {
    throw buildApiError(
      "573d8a24-44a6-4200-b993-8306c644463e",
      errIntegrationAuthWrongCredentials,
      {
        detail: "Invalid secret key. Please try again.",
      },
    );
  }

  if (!auth.started) {
    throw buildApiError(
      "813dcd04-81df-4f10-accd-346abbca46d9",
      errIntegrationAuthNotStarted,
      {
        detail: "Auth not started. Please try again.",
      },
    );
  }

  const loginPagePath = path.join(
    PUBLIC_PATH,
    "login-pages",
    `${integrationName}.html`,
  );

  const authUrl = await integration.getIntegrationAuthUrl(auth);

  if (fs.existsSync(loginPagePath)) {
    let html = fs
      .readFileSync(loginPagePath, {
        encoding: "utf-8",
      })
      .toString();

    html = html.replace("{{%REDIRECT_URI%}}", auth.authData.redirectUri);
    html = html.replace("{{%AUTH_URL%}}", authUrl);

    response?.send(html);
    return;
  }

  response?.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  response?.setHeader("Pragma", "no-cache");
  response?.setHeader("Expires", "0");
  response?.redirect(authUrl);
});

const authCancel = defineController<AuthCancelInput>(async ({ request }) => {
  const integrationName = request?.params.integrationName || "";

  if (!integrationName) {
    throw buildApiError(
      "ece5566d-1d05-4639-8ac7-c11ea1dade20",
      errIntegrationTypeNotFound,
      {
        detail: "No integration provided",
      },
    );
  }

  const integration = getIntegrationHandler(integrationName);

  if (!integration) {
    throw buildApiError(
      "5dcd7b40-1f39-4809-b11d-cb54d9855be0",
      errIntegrationTypeNotFound,
      {
        detail: `No integration found for the ${integrationName} type.`,
      },
    );
  }

  const authKey = request?.body.auth_key || "";
  const auth = IntegrationServices.getStartedAuth(authKey);
  if (!auth) {
    throw buildApiError(
      "cafa38d0-4951-492a-920c-784550f6fc4b",
      errIntegrationAuthNotFound,
      {
        detail: "No auth started with the given key",
      },
    );
  }

  IntegrationServices.closeAuth(authKey);
  return { canceled: true } satisfies CloudIntegrationAuthCancelOutput;
}, validate(authCancelSchema));

const getPhoto = defineController(async ({ request, response }) => {
  const integrationName = request?.params.integrationName || "";

  if (!integrationName) {
    throw buildApiError(
      "9c2ad32f-b70a-497e-a331-4c75c6bed776",
      errIntegrationTypeNotFound,
      {
        detail: "No integration provided",
      },
    );
  }

  const integration = getIntegrationHandler(integrationName);

  if (!integration) {
    throw buildApiError(
      "03f3e2e5-6110-44fe-aa0f-164eed39c913",
      errIntegrationTypeNotFound,
      {
        detail: `No integration found for the ${integrationName} type.`,
      },
    );
  }

  try {
    const authKey = String(request?.query.auth_key || "");

    if (!authKey) {
      throw buildApiError(
        "6f3c6e1c-5ae2-4e4e-a4a6-2863aa1194dd",
        errInvalidAuthKey,
        {
          detail: "No auth key provided",
        },
      );
    }

    const auth = await IntegrationServices.getIntegration(authKey);
    if (!auth) {
      throw buildApiError(
        "20b3192d-2c4f-42ab-8c2e-9cf399424bf0",
        errIntegrationAuthNotFound,
        {
          detail: "No integration found with the given key",
        },
      );
    }

    const photoId = String(request?.query.photo_id || "");
    const width = Number(request?.query.w || 0);
    const height = Number(request?.query.h || 0);

    if (!photoId) {
      throw buildApiError(
        "4def7a96-947c-4c69-ba60-628a8896da10",
        errIntegrationsInvalidPhotoId,
        {
          detail: "No photo id provided",
        },
      );
    }

    const photo = (await integration.getPhoto({
      auth,
      photoId,
      width,
      height,
    })) satisfies CloudIntegrationGetPhotosInAlbumOutput;

    response?.send(photo);
  } catch (error) {
    throw buildApiError(
      "9246fb3f-4981-4411-9e34-4e12dbaf4880",
      errIntegrationGetPhotoFailed,
      {
        detail: "Something went wrong fetching photos",
        errors: error,
      },
    );
  }
});

const getPhotosInAlbum = defineController<GetPhotosInAlbumInput>(
  async ({ request }) => {
    const integrationName = request?.params.integrationName || "";

    if (!integrationName) {
      throw buildApiError(
        "4697fb30-2636-453d-9aa6-86e09844ceca",
        errIntegrationTypeNotFound,
        {
          detail: "No integration provided",
        },
      );
    }

    const integration = getIntegrationHandler(integrationName);

    if (!integration) {
      throw buildApiError(
        "a6fce461-50fe-4b3d-b3f6-7d3658b7207a",
        errIntegrationTypeNotFound,
        {
          detail: `No integration found for the ${integrationName} type.`,
        },
      );
    }

    try {
      const albumId = String(request?.body.album_id || "");
      const authKey = String(request?.body.auth_key || "");
      const pageSize = Number(request?.body.page_size || 50);
      const nextPageToken = String(request?.body.next_page_token || "");

      if (!authKey) {
        throw buildApiError(
          "7c4cb0c9-b403-4653-8809-70f5fd0aeb84",
          errInvalidAuthKey,
          {
            detail: "No auth key provided",
          },
        );
      }

      if (!albumId) {
        throw buildApiError(
          "094e7773-83d3-4f69-82c5-0b2a94c42f65",
          errIntegrationMissingAlbumId,
          {
            detail: "No album id provided",
          },
        );
      }

      const auth = await IntegrationServices.getIntegration(authKey);

      if (!auth) {
        throw buildApiError(
          "4f7a0e3e-dd54-4861-86d9-a85dcde98eac",
          errIntegrationAuthNotFound,
          {
            detail: "No integration found with the given key",
          },
        );
      }

      return (await integration.getPhotosInAlbum(albumId, {
        pageSize,
        nextPageToken,
        auth,
      })) satisfies CloudIntegrationGetPhotosInAlbumOutput;
    } catch (error) {
      throw buildApiError(
        "05f1fa17-e538-4ebd-bcd0-471675d7a66a",
        errIntegrationGetPhotosFailed,
        {
          detail: "Something went wrong fetching photos in album",
          errors: error,
        },
      );
    }
  },
  validate(getPhotosInAlbumSchema),
);

const getAlbums = defineController(async ({ request }) => {
  try {
    const integrationName = request?.params.integrationName || "";

    if (!integrationName) {
      throw buildApiError(
        "7faeab9a-e13f-468a-a8b8-09e2b3d05928",
        errIntegrationTypeNotFound,
        {
          detail: "No integration provided",
        },
      );
    }

    const integration = getIntegrationHandler(integrationName);

    if (!integration) {
      throw buildApiError(
        "107f0cd9-a4a8-473a-bca2-f3510225a700",
        errIntegrationTypeNotFound,
        {
          detail: `No integration found for the ${integrationName} type.`,
        },
      );
    }

    const authKey = String(request?.query.auth_key || "");

    if (!authKey) {
      throw buildApiError(
        "cafa38d0-4951-492a-920c-784550f6fc4b",
        errInvalidAuthKey,
        {
          detail: "No auth key provided",
        },
      );
    }

    const auth = await IntegrationServices.getIntegration(authKey);
    if (!auth) {
      throw buildApiError(
        "cafa38d0-4951-492a-920c-784550f6fc4b",
        errIntegrationAuthNotFound,
        {
          detail: "No integration found with the given key",
        },
      );
    }

    return (await integration.getAlbums(
      auth,
    )) satisfies CloudIntegrationGetAlbumsOutput;
  } catch (error) {
    throw buildApiError(
      "9471a5fe-46ec-450c-83e8-a2550dca8f45",
      errIntegrationGetAlbumFailed,
      {
        detail: "Something went wrong fetching albums",
        errors: error,
      },
    );
  }
});

export const IntegrationControllers = {
  getIntegrations,
  deleteIntegration,
  getRandomPhotos,
  authStart,
  authRedirect,
  authLogin,
  authCancel,
  getPhoto,
  getPhotosInAlbum,
  getAlbums,
};
