import { readFileSync, writeFileSync } from "fs";
import { resolve } from "node:path";

const packageJsonPath = resolve("package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

// Increment the patch version
const versionParts = packageJson.version.split(".");
versionParts[2] = parseInt(versionParts[2], 10) + 1;
packageJson.version = versionParts.join(".");

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Updated version to ${packageJson.version}`);
