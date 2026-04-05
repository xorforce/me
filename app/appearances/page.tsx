import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Mic,
  Users,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SubpageShell } from "@/components/subpage-shell"
import talksData from "@/data/talks.json"
import podcastsData from "@/data/podcasts.json"

type AppearanceMetaItem = {
  icon: LucideIcon
  label: string
}

type AppearanceCardProps = {
  title: string
  description: string
  link: string
  tags: string[]
  thumbnail: {
    image?: string
    text: string
    gradient: string
  }
  meta: AppearanceMetaItem[]
}

function AppearanceCard({ title, description, link, tags, thumbnail, meta }: AppearanceCardProps) {
  return (
    <Card className="group site-card">
      <CardContent className="p-0">
        <Link href={link} className="block p-4" target="_blank" rel="noopener noreferrer">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <div className="flex-shrink-0">
                {thumbnail.image ? (
                  <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-28 sm:w-48">
                    <Image
                      src={thumbnail.image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 192px"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div
                    className={`flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br ${thumbnail.gradient} text-sm font-medium text-white sm:h-28 sm:w-48`}
                  >
                    {thumbnail.text}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="site-card-title mb-2">
                  {title}
                </h2>
                <div className="site-meta flex flex-wrap items-center gap-2 sm:gap-4">
                  {meta.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1">
                      <Icon className="h-3 w-3" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="site-card-copy mb-4">
                {description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="site-chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 transition-colors duration-200 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400" />
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function AppearancesPage() {
  return (
    <SubpageShell
      title="Appearances"
      description="Talks and podcast conversations around iOS, product thinking, architecture, and the occasional career tangent."
      maxWidthClass="max-w-3xl"
      showFooterBorder
    >
      <div className="space-y-12">
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="site-section-title">Talks</h2>
            <p className="site-body-copy">
              Mostly conference talks, usually about building iOS apps that can survive growth
              without turning into a mess.
            </p>
          </div>
          <div className="space-y-8">
            {talksData.talks.map((talk) => (
              <AppearanceCard
                key={`talk-${talk.id}`}
                title={talk.title}
                description={talk.description}
                link={talk.link}
                tags={talk.tags}
                thumbnail={talk.thumbnail}
                meta={[
                  { icon: Calendar, label: talk.date },
                  { icon: MapPin, label: talk.venue },
                  ...(talk.attendees ? [{ icon: Users, label: talk.attendees }] : []),
                ]}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="site-section-title">Podcasts</h2>
            <p className="site-body-copy">
              Longer conversations where I usually end up talking about work, taste, tradeoffs,
              and how mobile teams actually function in the real world.
            </p>
          </div>
          <div className="space-y-8">
            {podcastsData.podcasts.map((podcast) => (
              <AppearanceCard
                key={`podcast-${podcast.id}`}
                title={podcast.title}
                description={podcast.description}
                link={podcast.link}
                tags={podcast.tags}
                thumbnail={podcast.thumbnail}
                meta={[
                  { icon: Calendar, label: podcast.date },
                  { icon: Clock, label: podcast.duration },
                  { icon: Mic, label: podcast.podcast },
                ]}
              />
            ))}
          </div>
        </section>
      </div>
    </SubpageShell>
  )
}
