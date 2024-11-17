import { json } from "@remix-run/react";
import { readFileSync } from "fs";
import { resolve } from "path";

export async function loader() {
  const packageJsonPath = resolve("./package.json");
  const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(packageJsonContent);

  const version = packageJson.version;

  return json({
    ENV: {
      SERVER_REMIX_BUILD_VERSION: version.trim(),
    },
  });
}
