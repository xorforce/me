import http from "node:http"
import { exec } from "node:child_process"
import { URL } from "node:url"
import { z } from "zod"
import { encodeClientCredentials, getSpotifyConfig, loadLocalEnv } from "./spotify-utils.mjs"

const tokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().optional(),
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
})

function fail(message) {
  console.error(message)
  process.exit(1)
}

function openBrowser(url) {
  const platform = process.platform
  const command =
    platform === "darwin"
      ? `open "${url}"`
      : platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`

  exec(command, (error) => {
    if (error) {
      console.log("Open the URL below manually:")
      console.log(url)
    }
  })
}

async function exchangeCodeForTokens({ clientId, clientSecret, code, redirectUri }) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodeClientCredentials(clientId, clientSecret)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    const responseText = await response.text()
    throw new Error(`Spotify token exchange failed with ${response.status}: ${responseText}`)
  }

  return tokenResponseSchema.parse(await response.json())
}

async function main() {
  await loadLocalEnv()

  const { clientId, clientSecret, redirectUri, scope } = getSpotifyConfig()

  if (!clientId || !clientSecret) {
    fail(
      "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET. Add them to .env.local or export them before running npm run spotify:auth.",
    )
  }

  const callbackUrl = new URL(redirectUri)

  if (callbackUrl.protocol !== "http:") {
    fail("SPOTIFY_REDIRECT_URI must use http:// for the local auth helper.")
  }

  const authUrl = new URL("https://accounts.spotify.com/authorize")
  authUrl.searchParams.set("client_id", clientId)
  authUrl.searchParams.set("response_type", "code")
  authUrl.searchParams.set("redirect_uri", redirectUri)
  authUrl.searchParams.set("scope", scope)
  authUrl.searchParams.set("show_dialog", "true")

  const server = http.createServer((req, res) => {
    if (!req.url) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" })
      res.end("Missing request URL.")
      return
    }

    const requestUrl = new URL(req.url, redirectUri)

    if (requestUrl.pathname !== callbackUrl.pathname) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
      res.end("Not found.")
      return
    }

    const code = requestUrl.searchParams.get("code")
    const error = requestUrl.searchParams.get("error")

    if (error) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" })
      res.end(`Spotify authorization failed: ${error}`)
      console.error(`Spotify authorization failed: ${error}`)
      server.close()
      process.exitCode = 1
      return
    }

    if (!code) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" })
      res.end("Missing authorization code.")
      console.error("Spotify callback arrived without an authorization code.")
      server.close()
      process.exitCode = 1
      return
    }

    void (async () => {
      try {
        const tokens = await exchangeCodeForTokens({
          clientId,
          clientSecret,
          code,
          redirectUri,
        })

        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
        res.end("Spotify auth complete. Return to your terminal.")

        console.log("")
        console.log("Spotify tokens received.")
        console.log("")
        console.log(`SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token ?? ""}`)
        console.log("")
        console.log("Add this to .env.local:")
        console.log(`SPOTIFY_REFRESH_TOKEN="${tokens.refresh_token ?? ""}"`)

        if (!tokens.refresh_token) {
          console.warn("")
          console.warn(
            "Spotify did not return a refresh_token. Remove prior consent for this app and run npm run spotify:auth again.",
          )
        }
      } catch (exchangeError) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
        res.end("Token exchange failed. Check the terminal for details.")
        console.error(exchangeError)
        process.exitCode = 1
      } finally {
        server.close()
      }
    })()
  })

  await new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(Number(callbackUrl.port || 80), callbackUrl.hostname, () => resolve())
  })

  console.log(`Listening for Spotify callback on ${redirectUri}`)
  console.log("If the browser does not open, use this URL:")
  console.log(authUrl.toString())
  openBrowser(authUrl.toString())
}

await main()
