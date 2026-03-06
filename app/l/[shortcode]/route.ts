import { NextRequest, NextResponse } from "next/server";
import { getLinkByShortCode } from "@/data/links";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;

  // Look up the link by shortcode
  const link = await getLinkByShortCode(shortcode);

  // If link not found, return 404
  if (!link) {
    return NextResponse.json(
      { error: "Link not found" },
      { status: 404 }
    );
  }

  // Redirect to the original URL
  return NextResponse.redirect(link.originalUrl);
}
