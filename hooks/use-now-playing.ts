"use client"

import { useEffect, useState } from "react"

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

const REMOTE_NOW_PLAYING_ENDPOINT =
  process.env.NEXT_PUBLIC_SPOTIFY_NOW_PLAYING_URL?.trim() ||
  "https://raw.githubusercontent.com/xorforce/me/spotify-data/spotify-now-playing.json"
const LOCAL_NOW_PLAYING_ENDPOINT = "./spotify-now-playing.json"
const REFRESH_INTERVAL_MS = 60_000

const fallbackSnapshot: NowPlayingSnapshot = {
  status: "idle",
  isPlaying: false,
  title: null,
  artist: null,
  album: null,
  albumImageUrl: null,
  trackUrl: null,
  progressMs: null,
  durationMs: null,
  fetchedAt: new Date(0).toISOString(),
}

function isNowPlayingStatus(value: unknown): value is NowPlayingStatus {
  return value === "playing" || value === "paused" || value === "idle" || value === "error"
}

function normalizeSnapshot(payload: unknown): NowPlayingSnapshot {
  if (!payload || typeof payload !== "object") {
    return fallbackSnapshot
  }

  const snapshot = payload as Partial<NowPlayingSnapshot>

  return {
    status: isNowPlayingStatus(snapshot.status) ? snapshot.status : fallbackSnapshot.status,
    isPlaying: typeof snapshot.isPlaying === "boolean" ? snapshot.isPlaying : false,
    title: typeof snapshot.title === "string" ? snapshot.title : null,
    artist: typeof snapshot.artist === "string" ? snapshot.artist : null,
    album: typeof snapshot.album === "string" ? snapshot.album : null,
    albumImageUrl: typeof snapshot.albumImageUrl === "string" ? snapshot.albumImageUrl : null,
    trackUrl: typeof snapshot.trackUrl === "string" ? snapshot.trackUrl : null,
    progressMs: typeof snapshot.progressMs === "number" ? snapshot.progressMs : null,
    durationMs: typeof snapshot.durationMs === "number" ? snapshot.durationMs : null,
    fetchedAt:
      typeof snapshot.fetchedAt === "string" ? snapshot.fetchedAt : fallbackSnapshot.fetchedAt,
  }
}

function getNowPlayingEndpoints() {
  if (typeof window === "undefined") {
    return [REMOTE_NOW_PLAYING_ENDPOINT, LOCAL_NOW_PLAYING_ENDPOINT]
  }

  const hostname = window.location.hostname
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]"

  return isLocalhost
    ? [LOCAL_NOW_PLAYING_ENDPOINT, REMOTE_NOW_PLAYING_ENDPOINT]
    : [REMOTE_NOW_PLAYING_ENDPOINT, LOCAL_NOW_PLAYING_ENDPOINT]
}

async function fetchSnapshot(endpoint: string) {
  const separator = endpoint.includes("?") ? "&" : "?"
  const response = await fetch(`${endpoint}${separator}ts=${Date.now()}`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to load now playing snapshot: ${response.status}`)
  }

  return normalizeSnapshot(await response.json())
}

export function useNowPlaying() {
  const [snapshot, setSnapshot] = useState<NowPlayingSnapshot>(fallbackSnapshot)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadSnapshot = async () => {
      try {
        for (const endpoint of getNowPlayingEndpoints()) {
          try {
            const payload = await fetchSnapshot(endpoint)

            if (!isMounted) {
              return
            }

            setSnapshot(payload)
            return
          } catch {
            continue
          }
        }

        if (!isMounted) {
          return
        }

        setSnapshot(fallbackSnapshot)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadSnapshot()

    const intervalId = window.setInterval(() => {
      void loadSnapshot()
    }, REFRESH_INTERVAL_MS)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [])

  return {
    snapshot,
    isLoading,
  }
}
