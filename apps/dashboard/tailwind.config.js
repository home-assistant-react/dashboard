import { tailwindConfig } from "@home-assistant-react/tailwindcss-config";
import * as fs from "node:fs";

function getTailwindContentList() {
  const getDirectories = (source) =>
    fs
      .readdirSync(source)
      .map((folder) => `${source}/${folder}/src/**/*.{js,ts,jsx,tsx,html}`);

  return [
    ...getDirectories("../../packages"),
    ...getDirectories("../../apps"),
    ...getDirectories("../../panels"),
    ...getDirectories("../../property-controllers"),
  ];
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: getTailwindContentList(),
  plugins: [require("tailwindcss-animate")],
  presets: [tailwindConfig],
  blocklist: ["***/node_modules"], // Grandparent directory level],
};

getTailwindContentList();
