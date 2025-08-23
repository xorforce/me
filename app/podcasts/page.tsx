import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Mic, ExternalLink } from "lucide-react"
import podcastsData from "@/data/podcasts.json"

export default function Podcasts() {
  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-2xl mx-auto text-sm">
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
      <main className='max-w-2xl mx-auto px-8 py-12 animate-in fade-in duration-500'>
        <section className='mb-16'>
          <h1 className='text-2xl font-medium text-gray-900 dark:text-gray-50 mb-4 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300'>
            Podcasts
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200'>
            Conversations about iOS development, mobile app architecture, and
            the future of mobile technology.
          </p>

          <div className='mb-8'>
            <p className='text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200'>
              Want to have me on your podcast?{' '}
              <Button
                variant='ghost'
                size='sm'
                className='h-auto p-0 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent'
              >
                <Link href='mailto:bhagatsingh2297@gmail.com' className='hover:underline'>
                  Get in touch
                </Link>
              </Button>
            </p>
          </div>

          <div className='space-y-8'>
            {podcastsData.podcasts.map((podcast) => (
              <Card key={podcast.id} className='group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border-none shadow-none hover:scale-[1.005] transition-transform duration-200'>
                <CardContent className='p-0'>
                  <Link 
                    href={podcast.link} 
                    className='block p-4'
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className='space-y-4'>
                      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                        <div className='flex-shrink-0'>
                          {podcast.thumbnail.image ? (
                            <div className='w-full sm:w-48 h-32 sm:h-28 relative rounded-lg overflow-hidden'>
                              <Image
                                src={podcast.thumbnail.image}
                                alt={podcast.title}
                                fill
                                className='object-cover'
                                sizes="(max-width: 640px) 100vw, 192px"
                                unoptimized={true}
                              />
                            </div>
                          ) : (
                            <div className={`w-full sm:w-48 h-32 sm:h-28 bg-gradient-to-br ${podcast.thumbnail.gradient} rounded-lg flex items-center justify-center text-white font-medium text-sm`}>
                              {podcast.thumbnail.text}
                            </div>
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h2 className='text-lg font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-600 dark:group-hover:text-gray-300 mb-2 transition-colors duration-200'>
                            {podcast.title}
                          </h2>
                          <div className='flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='w-3 h-3' />
                              <span>{podcast.date}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Clock className='w-3 h-3' />
                              <span>{podcast.duration}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Mic className='w-3 h-3' />
                              <span>{podcast.podcast}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200'>
                          {podcast.description}
                        </p>
                        <div className='flex items-center justify-between'>
                          <div className='flex flex-wrap gap-2'>
                            {podcast.tags.map((tag, index) => (
                              <span key={index} className='text-xs text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200 whitespace-nowrap'>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <ExternalLink className='w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200' />
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='border-t border-gray-200 dark:border-gray-800 py-8'>
        <div className='max-w-2xl mx-auto px-8'>
          <div className='flex justify-between items-center text-xs text-gray-500 dark:text-gray-400'>
            <p>© 2024 Bhagat Singh</p>
            <div className='flex space-x-4'>
              <Button
                variant='ghost'
                size='sm'
                className='h-auto p-0 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent'
              >
                <Link href='/about' className='hover:underline'>
                  about
                </Link>
              </Button>
              <Button
                variant='ghost'
                size="sm"
                className='h-auto p-0 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent'
              >
                <Link
                  href='mailto:bhagatsingh2297@gmail.com'
                  className='hover:underline'
                >
                  contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
