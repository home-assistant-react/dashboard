import {
  createConnection,
  createLongLivedTokenAuth,
} from "home-assistant-js-websocket";

export const getHassConnection = async (
  hassUrl: string,
  accessToken: string,
) => {
  const auth = createLongLivedTokenAuth(hassUrl, accessToken);
  return await createConnection({ auth });
};
