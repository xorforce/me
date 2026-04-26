import { z } from "zod"

export type NowPlayingStatus = "playing" | "paused" | "idle" | "error"

export type NowPlayingSnapshot = {
  status: NowPlayingStatus
  isPlaying: boolean
  title: string | null
  artist: string | null
  album: string | null
  albumImageUrl: string | null
  trackUrl: string | null
  progressMs: number | null
  durationMs: number | null
  fetchedAt: string
}

const tokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().optional(),
})

const currentTrackSchema = z.object({
  is_playing: z.boolean(),
  progress_ms: z.number().nullable().optional(),
  item: z
    .object({
      type: z.string().optional(),
      name: z.string(),
      duration_ms: z.number(),
      external_urls: z.object({
        spotify: z.string().url(),
      }),
      artists: z.array(
        z.object({
          name: z.string(),
        }),
      ),
      album: z.object({
        name: z.string(),
        images: z
          .array(
            z.object({
              url: z.string().url(),
            }),
          )
          .default([]),
      }),
    })
    .nullable()
    .optional(),
})

function encodeClientCredentials(clientId: string, clientSecret: string) {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
}

function getSpotifyConfig() {
  return {
    clientId: process.env.SPOTIFY_CLIENT_ID?.trim() ?? "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET?.trim() ?? "",
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN?.trim() ?? "",
  }
}

export function buildNowPlayingSnapshot(
  overrides: Partial<NowPlayingSnapshot> = {},
): NowPlayingSnapshot {
  return {
    status: "idle",
    isPlaying: false,
    title: null,
    artist: null,
    album: null,
    albumImageUrl: null,
    trackUrl: null,
    progressMs: null,
    durationMs: null,
    fetchedAt: new Date().toISOString(),
    ...overrides,
  }
}

async function fetchAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodeClientCredentials(clientId, clientSecret)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Spotify token request failed with ${response.status}`)
  }

  const parsedResponse = tokenResponseSchema.parse(await response.json())
  return parsedResponse.access_token
}

async function fetchCurrentTrack(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  })

  if (response.status === 204) {
    return buildNowPlayingSnapshot()
  }

  if (!response.ok) {
    throw new Error(`Spotify currently-playing request failed with ${response.status}`)
  }

  const parsedResponse = currentTrackSchema.parse(await response.json())
  const track = parsedResponse.item

  if (!track || track.type === "episode") {
    return buildNowPlayingSnapshot({
      status: parsedResponse.is_playing ? "playing" : "paused",
      isPlaying: parsedResponse.is_playing,
    })
  }

  return buildNowPlayingSnapshot({
    status: parsedResponse.is_playing ? "playing" : "paused",
    isPlaying: parsedResponse.is_playing,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images[0]?.url ?? null,
    trackUrl: track.external_urls.spotify,
    progressMs: parsedResponse.progress_ms ?? null,
    durationMs: track.duration_ms,
  })
}

export async function getNowPlayingSnapshot(): Promise<NowPlayingSnapshot> {
  const { clientId, clientSecret, refreshToken } = getSpotifyConfig()

  if (!clientId || !clientSecret || !refreshToken) {
    return buildNowPlayingSnapshot({ status: "error" })
  }

  try {
    const accessToken = await fetchAccessToken(clientId, clientSecret, refreshToken)
    return await fetchCurrentTrack(accessToken)
  } catch (error) {
    console.error("Failed to fetch Spotify now playing.", error)
    return buildNowPlayingSnapshot({ status: "error" })
  }
}
