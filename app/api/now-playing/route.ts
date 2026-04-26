import { NextResponse } from "next/server"
import { getNowPlayingSnapshot } from "@/lib/spotify-now-playing"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const snapshot = await getNowPlayingSnapshot()

  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
