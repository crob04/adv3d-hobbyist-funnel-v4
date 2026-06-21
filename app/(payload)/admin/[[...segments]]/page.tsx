import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";

import { importMap } from "../importMap";

export const dynamic = "force-dynamic";

export const generateMetadata = ({
  params,
  searchParams
}: {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) =>
  generatePageMetadata({
    config,
    params,
    searchParams
  });

export default async function PayloadAdminPage({
  params,
  searchParams
}: {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  return RootPage({
    config,
    importMap,
    params,
    searchParams
  });
}
