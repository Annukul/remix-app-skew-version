import { json } from "@remix-run/react";
import { readFileSync } from "fs";
import { resolve } from "path";

export async function loader() {
  const indexPath = resolve("./build/server/index.js");
  const indexContent = readFileSync(indexPath, "utf-8");

  const versionMatch = indexContent.match(/"version":\s*"([^"]+)"/);
  const version = versionMatch ? versionMatch[1] : "unknown";

  return json({
    ENV: {
      SERVER_REMIX_BUILD_VERSION: version.trim(),
    },
  });
}
