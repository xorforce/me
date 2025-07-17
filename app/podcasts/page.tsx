import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Mic, ExternalLink } from "lucide-react"

export default function Podcasts() {
  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950">
      {/* Navigation */}
      <nav className="flex items-center justify-end px-8 py-6 max-w-2xl mx-auto text-sm">
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
            Podcasts
          </h1>
          <p className='text-sm text-gray-600 leading-relaxed mb-12 hover:text-gray-800 transition-colors duration-200'>
            Conversations about iOS development, mobile app architecture, and
            the future of mobile technology.
          </p>

          <div className='space-y-8'>
            <Card className='group hover:bg-gray-50 transition-all duration-200 border-none shadow-none'>
              <CardContent className='p-4'>
                <Link href='#' className='block'>
                  <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                    The Future of iOS Development with SwiftUI
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>December 10, 2024</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='w-3 h-3' />
                      <span>45 min</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Mic className='w-3 h-3' />
                      <span>iOS Dev Weekly</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Deep conversation about SwiftUI's evolution, modern iOS app
                    architecture, and best practices for building scalable
                    mobile applications. We explore design patterns, performance
                    optimization, and the future of iOS development.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        SwiftUI
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        iOS Development
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Guest
                      </span>
                    </div>
                    <ExternalLink className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' />
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className='group hover:bg-gray-50 transition-all duration-200 border-none shadow-none'>
              <CardContent className='p-4'>
                <Link href='#' className='block'>
                  <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                    Building E-commerce Apps with SwiftUI and ONDC
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>November 22, 2024</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='w-3 h-3' />
                      <span>38 min</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Mic className='w-3 h-3' />
                      <span>Mobile Dev Talks</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Discussion on building the Pincode e-commerce app using
                    SwiftUI on the ONDC network. Covering challenges in mobile
                    e-commerce, integration strategies, and lessons learned from
                    building a production app from scratch.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        E-commerce
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        ONDC
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Guest
                      </span>
                    </div>
                    <ExternalLink className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' />
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className='group hover:bg-gray-50 transition-all duration-200 border-none shadow-none'>
              <CardContent className='p-4'>
                <Link href='#' className='block'>
                  <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                    Machine Learning on iOS: CoreML and Beyond
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>October 15, 2024</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='w-3 h-3' />
                      <span>52 min</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Mic className='w-3 h-3' />
                      <span>AI & Mobile</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Exploring the integration of machine learning in iOS
                    applications using CoreML. From model preparation to
                    on-device inference, we discuss practical approaches to
                    building intelligent mobile apps.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        CoreML
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Machine Learning
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Guest
                      </span>
                    </div>
                    <ExternalLink className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' />
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className='group hover:bg-gray-50 transition-all duration-200 border-none shadow-none'>
              <CardContent className='p-4'>
                <Link href='#' className='block'>
                  <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                    From Zomato to PhonePe: An iOS Developer's Journey
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>September 8, 2024</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='w-3 h-3' />
                      <span>41 min</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Mic className='w-3 h-3' />
                      <span>Career Chats</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Personal story about growing as an iOS developer in India's
                    tech ecosystem. From internship at Zomato to leading iOS
                    development at PhonePe, sharing lessons learned and advice
                    for aspiring mobile developers.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Career
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        iOS Development
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Guest
                      </span>
                    </div>
                    <ExternalLink className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' />
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <div className='text-center py-8'>
            <p className='text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200'>
              Want to have me on your podcast?{' '}
              <Button
                variant='ghost'
                size='sm'
                className='h-auto p-0 text-xs text-gray-500 hover:text-gray-900 hover:bg-transparent'
              >
                <Link
                  href='mailto:bhagatsingh2297@gmail.com'
                  className='hover:underline'
                >
                  Let's chat
                </Link>
              </Button>
            </p>
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
                size='sm'
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
