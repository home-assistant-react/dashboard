import "express";
import { UserModel } from "@home-assistant-react/db/src/schema";
import { WebsocketHandler } from "./websocket/websocket-handler";

declare module "express-serve-static-core" {
  export interface Request {
    user?: UserModel;
    wss: WebsocketHandler;
  }
}
