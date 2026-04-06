import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, "..")
const envFilePath = path.join(repoRoot, ".env.local")

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }

  return value
}

export async function loadLocalEnv() {
  try {
    const fileContents = await readFile(envFilePath, "utf8")

    for (const rawLine of fileContents.split(/\r?\n/)) {
      const line = rawLine.trim()

      if (!line || line.startsWith("#")) {
        continue
      }

      const separatorIndex = line.indexOf("=")

      if (separatorIndex === -1) {
        continue
      }

      const key = line.slice(0, separatorIndex).trim()
      const value = stripWrappingQuotes(line.slice(separatorIndex + 1).trim())

      if (key && process.env[key] === undefined) {
        process.env[key] = value
      }
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return
    }

    throw error
  }
}

export function getSpotifyConfig() {
  return {
    clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
    redirectUri: process.env.SPOTIFY_REDIRECT_URI ?? "http://127.0.0.1:3124/callback",
    scope:
      process.env.SPOTIFY_AUTH_SCOPE ??
      "user-read-currently-playing user-read-playback-state",
  }
}

export function encodeClientCredentials(clientId, clientSecret) {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
}
