import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { MAX_FILE_BYTES, isAllowedFile } from "@/lib/rfq";

/**
 * Issues short-lived tokens so the browser can upload drawings straight to
 * Vercel Blob (bypassing the ~4.5 MB request limit of serverless functions).
 * Files are stored privately under rfq/ and attached to the RFQ email.
 */
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "File uploads are not configured." }, { status: 503 });
  }
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("rfq/") || !isAllowedFile(pathname)) {
          throw new Error("File type not allowed");
        }
        return {
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
