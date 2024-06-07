import bodyParser from "body-parser";
import express from "express";
import compress from "compression";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { v1 } from "../api/v1";
import { PUBLIC_PATH } from "../const";
import { staticRequests } from "../helpers/static-requests";
import {
  errorHandler,
  expressErrorNotFound,
  handleServerErrors,
} from "./middlewares/errors";

export const app = express()
  .use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")) // logging
  .use(bodyParser.json()) // parse JSON request bodies
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.text())
  .use(compress()) // gzip compression
  .use(fileUpload()) // enable file uploads
  /*.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  ) // use secure headers*/
  .use(cors()) // enable Cross Origin Resource Sharing // parse URL-encoded request bodies

  .use(staticRequests)
  .use(express.static(PUBLIC_PATH)) // serve static files
  .use("/v1", v1) // Attach v1 API routes

  // Errors
  .use(handleServerErrors) // Handle server errors
  .use(expressErrorNotFound) // Handle not found error
  .use(errorHandler); // Handle server errors
