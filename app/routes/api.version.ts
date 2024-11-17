import { json } from "@remix-run/react";
import { assets } from "build/server/index.js";

export async function loader() {
  const { version } = assets;

  return json({
    ENV: {
      SERVER_REMIX_BUILD_VERSION: version.trim(),
    },
  });
}
