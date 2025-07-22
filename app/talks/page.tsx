import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react"
import talksData from "@/data/talks.json"

export default function Talks() {
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
          <h1 className='text-2xl font-medium text-gray-900 mb-4 hover:text-gray-700 transition-colors duration-300'>
            Talks
          </h1>
          <p className='text-sm text-gray-600 leading-relaxed mb-4 hover:text-gray-800 transition-colors duration-200'>
            Speaking about iOS development, machine learning, and building
            better mobile experiences.
          </p>

          <div className='mb-8'>
            <p className='text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200'>
              Want me to speak at your event?{' '}
              <Button
                variant='ghost'
                size='sm'
                className='h-auto p-0 text-xs text-gray-500 hover:text-gray-900 hover:bg-transparent'
              >
                <Link href='mailto:bhagatsingh2297@gmail.com' className='hover:underline'>
                  Get in touch
                </Link>
              </Button>
            </p>
          </div>

          <div className='space-y-8'>
            {talksData.talks.map((talk) => (
              <Card key={talk.id} className='group hover:bg-gray-50 transition-all duration-200 border-none shadow-none'>
                <CardContent className='p-0'>
                  <Link 
                    href={talk.link} 
                    className='block p-4'
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className='space-y-4'>
                      <div className='flex gap-6'>
                        <div className='flex-shrink-0'>
                          {talk.thumbnail.image ? (
                            <div className='w-48 h-28 relative rounded-lg overflow-hidden'>
                              <Image
                                src={talk.thumbnail.image}
                                alt={talk.title}
                                fill
                                className='object-cover'
                                sizes="192px"
                                unoptimized={true}
                              />
                            </div>
                          ) : (
                            <div className={`w-48 h-28 bg-gradient-to-br ${talk.thumbnail.gradient} rounded-lg flex items-center justify-center text-white font-medium text-sm`}>
                              {talk.thumbnail.text}
                            </div>
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                            {talk.title}
                          </h2>
                          <div className='flex items-center gap-4 text-xs text-gray-500'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='w-3 h-3' />
                              <span>{talk.date}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <MapPin className='w-3 h-3' />
                              <span>{talk.venue}</span>
                            </div>
                            {talk.attendees && (
                              <div className='flex items-center gap-1'>
                                <Users className='w-3 h-3' />
                                <span>{talk.attendees}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                          {talk.description}
                        </p>
                        <div className='flex items-center justify-between'>
                          <div className='flex space-x-2'>
                            {talk.tags.map((tag, index) => (
                              <span key={index} className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <ExternalLink className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' />
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
      <footer className='border-t border-gray-200 py-8'>
        <div className='max-w-2xl mx-auto px-8'>
          <div className='flex justify-between items-center text-xs text-gray-500'>
            <p>© 2024 Bhagat Singh</p>
            <div className='flex space-x-4'>
              <Button
                variant='ghost'
                size='sm'
                className='h-auto p-0 text-xs text-gray-500 hover:text-gray-900 hover:bg-transparent'
              >
                <Link href='/about' className='hover:underline'>
                  about
                </Link>
              </Button>
              <Button
                variant='ghost'
                size="sm"
                className='h-auto p-0 text-xs text-gray-500 hover:text-gray-900 hover:bg-transparent'
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
