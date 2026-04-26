"use client"

import { useEffect, useState } from "react"
import type { NowPlayingSnapshot, NowPlayingStatus } from "@/lib/spotify-now-playing"

const NOW_PLAYING_ENDPOINT = "/api/now-playing"
const REFRESH_INTERVAL_MS = 15_000

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

async function fetchSnapshot() {
  const response = await fetch(`${NOW_PLAYING_ENDPOINT}?ts=${Date.now()}`, {
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
        const payload = await fetchSnapshot()

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
