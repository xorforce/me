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

const NOW_PLAYING_ENDPOINT = "./spotify-now-playing.json"
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

export function useNowPlaying() {
  const [snapshot, setSnapshot] = useState<NowPlayingSnapshot>(fallbackSnapshot)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadSnapshot = async () => {
      try {
        const response = await fetch(`${NOW_PLAYING_ENDPOINT}?ts=${Date.now()}`, {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`Failed to load now playing snapshot: ${response.status}`)
        }

        const payload = normalizeSnapshot(await response.json())

        if (!isMounted) {
          return
        }

        setSnapshot(payload)
      } catch {
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
