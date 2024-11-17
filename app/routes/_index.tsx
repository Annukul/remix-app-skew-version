import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

type _windowType = typeof window & { ENV: Record<string, string> };

export async function loader() {
  return null;
}

export default function Index() {
  const fetcher = useFetcher();

  useEffect(() => {
    // const env =
    //   window !== undefined
    //     ? (window as _windowType).ENV.NODE_ENV
    //     : "development";

    // if (env === "development") return;

    const interval = setInterval(() => {
      // This is to avoid making the request when the tab is not visible
      if (document.visibilityState === "visible") {
        fetcher.load("/api/version");
      }
    }, 1000); // You can change this to whatever you want
    return () => clearInterval(interval);
  }, [fetcher]);

  useEffect(() => {
    // const env =
    //   window !== undefined
    //     ? (window as _windowType).ENV.NODE_ENV
    //     : "development";

    // if (env === "development") return;

    const clientRemixBuildVersion =
      window !== undefined
        ? (window as _windowType).ENV.CLIENT_REMIX_BUILD_VERSION
        : "";

    if (fetcher.data) {
      // You can remove these type assertions by creating a type for the data
      const serverRemixBuildVesion = (
        fetcher.data as {
          ENV: { SERVER_REMIX_BUILD_VERSION: string };
        }
      ).ENV.SERVER_REMIX_BUILD_VERSION as string;

      console.log({ serverRemixBuildVesion, clientRemixBuildVersion });

      if (
        serverRemixBuildVesion !== clientRemixBuildVersion &&
        clientRemixBuildVersion !== ""
      ) {
        // Here I am reloading the page, but you can do whatever you want here
        console.log("New delpoyment detected, reloading the page");
        window.location.reload();
      }
    }
  }, [fetcher.data]);

  return <div>Skew version app</div>;
}
