import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { sync } from "glob";
import kleur from "kleur";

// Parse command line arguments
const args = process.argv.slice(2);
const quietMode = args.includes("--quiet");
const packageToLint = args.find((arg) => !arg.startsWith("--")); // Find the package name

// Define the root path
const rootPath = path.resolve(__dirname, "../../../..");

// Path to the pnpm-workspace.yaml file
const workspaceFile = path.resolve(rootPath, "pnpm-workspace.yaml");

// Read and parse the pnpm-workspace.yaml file
const workspaceConfig = yaml.load(fs.readFileSync(workspaceFile, "utf8")) as {
  packages: string[];
};

// Function to resolve package paths based on workspace globs
const resolvePackagePaths = (workspaceGlobs: string[]): string[] => {
  const packagePaths: string[] = [];
  workspaceGlobs.forEach((globPattern) => {
    const globPath = path.resolve(rootPath, globPattern);
    const resolvedPaths = sync(globPath);
    packagePaths.push(...resolvedPaths);
  });
  return packagePaths;
};

// Get all package paths from the workspace configuration
const packagePaths = resolvePackagePaths(workspaceConfig.packages);

// Check if packagePaths is empty or not an array
if (!Array.isArray(packagePaths) || packagePaths.length === 0) {
  throw new Error("No packages found in the workspace configuration");
}

// Function to run ESLint on a package
const runESLint = (packagePath: string) => {
  // eslint-disable-next-line no-console
  console.log(kleur.blue().bold(`Linting ${packagePath}...`));

  // Check if any files exist in the directory
  const filesInDirectory = sync(`${packagePath}/src/**/*.{js,ts,tsx}`);
  if (filesInDirectory.length === 0) {
    // eslint-disable-next-line no-console
    console.log(
      kleur.yellow().bold(`No files found in ${packagePath}. Skipping ESLint.`),
    );
    return;
  }

  try {
    // Run ESLint
    let eslintCommand = `eslint "${packagePath}/src/**/*.{js,ts,tsx}"`;
    if (quietMode) {
      eslintCommand += " --quiet";
    }
    execSync(eslintCommand, { stdio: "inherit" });
    // eslint-disable-next-line no-console
    console.log(
      kleur.green().bold(`Linting of ${packagePath} completed successfully.`),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(kleur.red().bold(`Failed to lint ${packagePath}`));
  }
};

// If a specific package is provided, only lint that package
if (packageToLint) {
  const packagePath = path.resolve(rootPath, packageToLint);
  if (!packagePaths.includes(packagePath)) {
    throw new Error(
      `Package '${packageToLint}' not found in the workspace configuration`,
    );
  }
  runESLint(packagePath);
} else {
  // Iterate over each package and run ESLint
  packagePaths.forEach((pkgPath) => {
    runESLint(pkgPath);
  });
}
