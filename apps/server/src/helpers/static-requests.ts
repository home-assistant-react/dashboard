import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { IS_ADDON, PUBLIC_PATH } from "../const";

export const staticRequests = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const requestUrl = request.path === "/" ? "/index.html" : request.path;
  const isJsFile = requestUrl.endsWith(".js");
  const isHtmlFile = requestUrl.endsWith(".html");

  const urlToReplace = IS_ADDON
    ? String(request?.headers?.["x-ingress-path"] || "") + "/"
    : "/";

  if (isJsFile || isHtmlFile) {
    const filePath = path.join(PUBLIC_PATH, requestUrl);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return response.status(500).send("Internal Server Error");
      }
      // Modify the content of the JavaScript file as needed
      const modifiedData = data
        .replace(/\/\[\[\*\*\|DASHBOARD_BASE_URL\|\*\*]](\/)?/g, urlToReplace)
        .replace(
          /\/%5B%5B\*\*%7CDASHBOARD_BASE_URL%7C\*\*%5D%5D\//g,
          urlToReplace,
        );
      // Set Content-Type header
      response.set("Content-Type", isJsFile ? "text/javascript" : "text/html");
      // Send the modified JavaScript content
      response.send(modifiedData);
    });
  } else {
    // Pass through for non-JS files
    next();
  }
};
