"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Instagram, Music, Headphones, ExternalLink } from "lucide-react"
import djingData from "@/data/djing.json"
import { useMemo } from "react"

export default function DJing() {
  // Parse date from DD/MM/YYYY format
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number)
    return new Date(year, month - 1, day)
  }

  // Parse time from HH:MM or HH:MM - HH:MM format
  const parseTime = (timeStr: string | undefined): number => {
    if (!timeStr) return 0
    // Extract start time (first time in range)
    const startTime = timeStr.split(' - ')[0] || timeStr
    const [hours, minutes] = startTime.split(':').map(Number)
    return hours * 60 + minutes // Convert to minutes for comparison
  }

  // Categorize gigs into upcoming and past
  const { upcomingGigs, pastGigs } = useMemo(() => {
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    const upcoming: typeof djingData.gigs = []
    const past: typeof djingData.gigs = []

    djingData.gigs.forEach((gig) => {
      const gigDate = parseDate(gig.date)
      const gigTimeMinutes = parseTime(gig.time)

      // Create a date object with the gig's date and time
      const gigDateTime = new Date(gigDate)
      if (gigTimeMinutes > 0) {
        gigDateTime.setHours(Math.floor(gigTimeMinutes / 60), gigTimeMinutes % 60)
      } else {
        // If no time specified, use end of day (23:59)
        gigDateTime.setHours(23, 59)
      }

      // Compare dates
      if (gigDateTime < now) {
        past.push(gig)
      } else {
        upcoming.push(gig)
      }
    })

    // Sort upcoming by date (ascending)
    upcoming.sort((a, b) => {
      const dateA = parseDate(a.date)
      const dateB = parseDate(b.date)
      return dateA.getTime() - dateB.getTime()
    })

    // Sort past by date (descending - most recent first)
    past.sort((a, b) => {
      const dateA = parseDate(a.date)
      const dateB = parseDate(b.date)
      return dateB.getTime() - dateA.getTime()
    })

    return { upcomingGigs: upcoming, pastGigs: past }
  }, [])

  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = parseDate(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  return (
    <div className="min-h-screen bg-background font-mono">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-4xl mx-auto text-sm">
        {/* Back Arrow */}
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
        >
          <Link href="/" className="hover:underline flex items-center">
            ← back
          </Link>
        </Button>
        
        <div className="flex items-center space-x-4 text-xs">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="/" className="hover:underline">
              home
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="https://github.com/xorforce" className="hover:underline">
              github
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="https://twitter.com/soulful_swift" className="hover:underline">
              twitter
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="mailto:bhagatsingh2297@gmail.com" className="hover:underline">
              email
            </Link>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12 animate-in fade-in duration-500">
        {/* Header Section */}
        <section className="mb-16">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-50 mb-4 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            DJing
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">
            Mixing tracks and curating sounds. Check out my latest mixes, upcoming gigs, and what I'm playing right now.
          </p>

          {/* Social Follow Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant="outline"
              size="sm"
              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <Link 
                href={djingData.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Follow on Instagram
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <Link 
                href={djingData.socialLinks.mixcloud} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Headphones className="w-4 h-4" />
                Follow on Mixcloud
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <Link 
                href={djingData.socialLinks.soundcloud} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Music className="w-4 h-4" />
                Follow on SoundCloud
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <Link 
                href={djingData.socialLinks.epk} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View EPK
              </Link>
            </Button>
          </div>
        </section>

        {/* Mixes Section */}
        <section className="mb-16">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            Mixes
          </h2>
          <div className="space-y-6">
            {djingData.mixes.map((mix) => (
              <Card key={mix.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border-none shadow-none hover:scale-[1.005] transition-transform duration-200">
                <CardContent className="p-0">
                  <div className="p-4">
                    {/* Embed */}
                    <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ minHeight: mix.platform === "mixcloud" ? "400px" : "300px" }}>
                      <iframe
                        src={mix.embedUrl}
                        width="100%"
                        height={mix.platform === "soundcloud" ? "300" : mix.platform === "mixcloud" ? "400" : "120"}
                        frameBorder="0"
                        scrolling="no"
                        allow={mix.platform === "mixcloud" ? "encrypted-media; fullscreen; autoplay;" : "autoplay"}
                        allowFullScreen
                        title={mix.title || "Mix embed"}
                        style={{ border: "none", display: "block" }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Platform Links */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button
              variant="outline"
              size="sm"
              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <Link 
                href={djingData.socialLinks.soundcloud} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                More on SoundCloud
                <ExternalLink className="w-3 h-3" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <Link 
                href={djingData.socialLinks.mixcloud} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                More on Mixcloud
                <ExternalLink className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Upcoming Gigs Section */}
        {upcomingGigs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
              Upcoming Gigs
            </h2>
            <div className="space-y-4">
              {upcomingGigs.map((gig) => (
                <Card key={gig.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border-none shadow-none hover:scale-[1.005] transition-transform duration-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        {gig.eventTitle && (
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-600 dark:group-hover:text-gray-300 mb-2 transition-colors duration-200">
                            {gig.eventTitle}
                          </h3>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {gig.venue}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{gig.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(gig.date)}</span>
                          </div>
                          {gig.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{gig.time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {gig.eventLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          asChild
                        >
                          <Link 
                            href={gig.eventLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Event Details
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Past Gigs Section */}
        {pastGigs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
              Past Gigs
            </h2>
            <div className="space-y-2">
              {pastGigs.map((gig) => (
                <Card key={gig.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border-none shadow-none">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
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
        )}

        {/* Photos Section */}
        {djingData.photos.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
              Photos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {djingData.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 hover:scale-[1.02] transition-transform duration-200"
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity duration-200"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <p>© 2024 Bhagat Singh</p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
              >
                <Link href="/about" className="hover:underline">
                  about
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
              >
                <Link
                  href="mailto:bhagatsingh2297@gmail.com"
                  className="hover:underline"
                >
                  contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

