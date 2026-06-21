import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";

import "./custom.scss";
import { importMap } from "./admin/importMap";

export const dynamic = "force-dynamic";

export default async function PayloadLayout({ children }: { children: React.ReactNode }) {
  const serverFunction: ServerFunctionClient = async (args) => {
    "use server";

    return handleServerFunctions({
      ...args,
      config,
      importMap
    });
  };

  return RootLayout({
    children,
    config,
    importMap,
    serverFunction
  });
}
