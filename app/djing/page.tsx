"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import {
  Calendar,
  Clock,
  ExternalLink,
  Headphones,
  Instagram,
  MapPin,
  Music,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SubpageShell } from "@/components/subpage-shell"
import djingData from "@/data/djing.json"

export default function DJing() {
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("/").map(Number)
    return new Date(year, month - 1, day)
  }

  const parseTime = (timeStr: string | undefined): number => {
    if (!timeStr) return 0

    const startTime = timeStr.split(" - ")[0] || timeStr
    const [hours, minutes] = startTime.split(":").map(Number)
    return hours * 60 + minutes
  }

  const { upcomingGigs, pastGigs } = useMemo(() => {
    const now = new Date()

    const upcoming: typeof djingData.gigs = []
    const past: typeof djingData.gigs = []

    djingData.gigs.forEach((gig) => {
      const gigDate = parseDate(gig.date)
      const gigTimeMinutes = parseTime(gig.time)

      const gigDateTime = new Date(gigDate)
      if (gigTimeMinutes > 0) {
        gigDateTime.setHours(Math.floor(gigTimeMinutes / 60), gigTimeMinutes % 60)
      } else {
        gigDateTime.setHours(23, 59)
      }

      if (gigDateTime < now) {
        past.push(gig)
      } else {
        upcoming.push(gig)
      }
    })

    upcoming.sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())
    past.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())

    return { upcomingGigs: upcoming, pastGigs: past }
  }, [])

  const formatDate = (dateStr: string): string => {
    const date = parseDate(dateStr)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <SubpageShell
      title="DJing"
      description="Mixing tracks, curating sound, and figuring out how to make a room feel right."
      maxWidthClass="max-w-4xl"
      showFooterBorder
    >
      <div className="space-y-16">
        <section className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <Link
                href={djingData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" />
                Follow on Instagram
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <Link
                href={djingData.socialLinks.mixcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Headphones className="h-4 w-4" />
                Follow on Mixcloud
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <Link
                href={djingData.socialLinks.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Music className="h-4 w-4" />
                Follow on SoundCloud
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <Link
                href={djingData.socialLinks.epk}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View EPK
              </Link>
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="site-section-title">Mixes</h2>
          <div className="space-y-6">
            {djingData.mixes.map((mix) => (
              <Card key={mix.id} className="group site-card">
                <CardContent className="p-4">
                  <div
                    className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                    style={{ minHeight: mix.platform === "mixcloud" ? "400px" : "300px" }}
                  >
                    <iframe
                      src={mix.embedUrl}
                      width="100%"
                      height={
                        mix.platform === "soundcloud"
                          ? "300"
                          : mix.platform === "mixcloud"
                            ? "400"
                            : "120"
                      }
                      frameBorder="0"
                      scrolling="no"
                      allow={
                        mix.platform === "mixcloud"
                          ? "encrypted-media; fullscreen; autoplay;"
                          : "autoplay"
                      }
                      allowFullScreen
                      title={mix.title || "Mix embed"}
                      style={{ border: "none", display: "block" }}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <Link
                href={djingData.socialLinks.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                More on SoundCloud
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <Link
                href={djingData.socialLinks.mixcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                More on Mixcloud
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </section>

        {upcomingGigs.length > 0 ? (
          <section className="space-y-4">
            <h2 className="site-section-title">Upcoming gigs</h2>
            <div className="space-y-4">
              {upcomingGigs.map((gig) => (
                <Card key={gig.id} className="group site-card">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        {gig.eventTitle ? (
                          <h3 className="site-card-title mb-2">{gig.eventTitle}</h3>
                        ) : null}
                        <p className="site-body-copy mb-2">{gig.venue}</p>
                        <div className="site-meta flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{gig.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(gig.date)}</span>
                          </div>
                          {gig.time ? (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{gig.time}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {gig.eventLink ? (
                        <Button variant="outline" size="sm" className="text-xs" asChild>
                          <Link
                            href={gig.eventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Event details
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {pastGigs.length > 0 ? (
          <section className="space-y-4">
            <h2 className="site-section-title">Past gigs</h2>
            <div className="space-y-2">
              {pastGigs.map((gig) => (
                <Card key={gig.id} className="group site-card">
                  <CardContent className="p-3">
                    <div className="site-body-copy flex flex-wrap items-center gap-3">
                      <span className="site-card-title">
                        {gig.eventTitle || gig.venue}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500">•</span>
                      <span>{gig.location}</span>
                      <span className="text-gray-400 dark:text-gray-500">•</span>
                      <span>{formatDate(gig.date)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {djingData.photos.length > 0 ? (
          <section className="space-y-6">
            <h2 className="site-section-title">Photos</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {djingData.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 transition-transform duration-200 hover:scale-[1.02] dark:bg-gray-800"
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </SubpageShell>
  )
}
