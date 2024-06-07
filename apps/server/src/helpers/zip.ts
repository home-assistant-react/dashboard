import fs from "node:fs/promises";
import JSZip from "jszip";
import path from "path";
import archiver from "archiver";

export async function extractZip(buffer: Buffer, dest: string) {
  const zip = await JSZip.loadAsync(buffer);
  await Promise.all(
    Object.values(zip.files).map(async (file) => {
      const filePath = path.join(dest, file.name);
      if (file.dir && file.name !== "__MACOSX") {
        console.log("Creating directory", filePath);
        await fs.mkdir(filePath, { recursive: true });
      } else if (
        file.name !== ".DS_Store" &&
        !filePath.includes("/__MACOSX/")
      ) {
        const content = await file.async("nodebuffer");
        await fs.writeFile(filePath, content);
      }
    }),
  );
}

interface ZipResult {
  blob: Blob;
  fileList: string[];
}

async function addFolderToArchive(
  folderPath: string,
  fileList: string[],
  rootPath: string,
) {
  const files = await fs.readdir(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.stat(filePath);
    const relativePath = path.relative(path.join(rootPath, "../"), filePath);
    console.log("ROOT", rootPath, relativePath);

    if (stats.isDirectory()) {
      fileList.push(relativePath + "/");
      await addFolderToArchive(filePath, fileList, rootPath);
    } else {
      fileList.push(relativePath);
    }
  }
}

export async function zipFoldersToBlob(
  folderPaths: string[],
  version: string,
  type: string,
): Promise<ZipResult> {
  console.log("PATHS", folderPaths);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Compression level
  });

  const fileList: string[] = [];

  // Pipe the archive to a buffer
  const buffers: Buffer[] = [];
  archive.on("data", (data: Buffer) => buffers.push(data));

  // Iterate over each folder and add its contents to the archive
  for (const folderPath of folderPaths) {
    const folderName = path.basename(folderPath);
    archive.directory(folderPath, folderName); // Add the entire folder to the archive
    await addFolderToArchive(folderPath, fileList, folderPath);
  }

  fileList.push("info.json");

  // Create info.json with the file list
  const info = {
    files: fileList,
    version,
    created_at: new Date().toISOString(),
    type,
    backupFolders: folderPaths,
  };
  archive.append(JSON.stringify(info), { name: "info.json" });

  // Finalize the archive
  archive.finalize();

  // Wait for the archive to finish
  await new Promise<void>((resolve, reject) => {
    archive.on("end", resolve);
    archive.on("error", reject);
  });

  // Create a Blob from the buffer
  const blob = new Blob(buffers, { type: "application/zip" });

  return { blob, fileList };
}
