import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { z } from "zod"
import { encodeClientCredentials, getSpotifyConfig, loadLocalEnv } from "./spotify-utils.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.join(__dirname, "..", "public", "spotify-now-playing.json")

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

function buildSnapshot(overrides = {}) {
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

async function writeSnapshot(snapshot) {
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8")
}

function getCredentials() {
  const { clientId, clientSecret, refreshToken } = getSpotifyConfig()

  if (!clientId || !clientSecret || !refreshToken) {
    return null
  }

  return {
    clientId,
    clientSecret,
    refreshToken,
  }
}

async function fetchAccessToken(credentials) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodeClientCredentials(
        credentials.clientId,
        credentials.clientSecret,
      )}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: credentials.refreshToken,
    }),
  })

  if (!response.ok) {
    throw new Error(`Spotify token request failed with ${response.status}`)
  }

  const parsedResponse = tokenResponseSchema.parse(await response.json())
  return parsedResponse.access_token
}

async function fetchCurrentTrack(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status === 204) {
    return buildSnapshot()
  }

  if (!response.ok) {
    throw new Error(`Spotify currently-playing request failed with ${response.status}`)
  }

  const parsedResponse = currentTrackSchema.parse(await response.json())
  const track = parsedResponse.item

  if (!track || track.type === "episode") {
    return buildSnapshot({
      status: parsedResponse.is_playing ? "playing" : "paused",
      isPlaying: parsedResponse.is_playing,
    })
  }

  return buildSnapshot({
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

async function main() {
  await loadLocalEnv()

  const credentials = getCredentials()

  if (!credentials) {
    await writeSnapshot(buildSnapshot())
    console.log("Spotify credentials missing. Wrote fallback snapshot.")
    return
  }

  try {
    const accessToken = await fetchAccessToken(credentials)
    const snapshot = await fetchCurrentTrack(accessToken)

    await writeSnapshot(snapshot)
    console.log(`Wrote Spotify snapshot with status: ${snapshot.status}`)
  } catch (error) {
    await writeSnapshot(buildSnapshot({ status: "error" }))
    console.error("Failed to refresh Spotify snapshot.")
    console.error(error)
  }
}

await main()
