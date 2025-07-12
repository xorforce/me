import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

export default function Talks() {
  return (
    <div className='min-h-screen bg-white font-mono'>
      {/* Navigation */}
      <nav className='flex items-center justify-between px-8 py-6 max-w-2xl mx-auto text-sm'>
        <div className='flex items-center space-x-6'>
          <Link
            href='/'
            className='text-gray-900 hover:text-gray-600 transition-colors duration-200'
          >
            home
          </Link>
          <Link
            href='/writing'
            className='text-gray-900 hover:text-gray-600 transition-colors duration-200'
          >
            writing
          </Link>
          <Link
            href='/talks'
            className='text-gray-900 hover:text-gray-600 transition-colors duration-200'
          >
            talks
          </Link>
          <Link
            href='/podcasts'
            className='text-gray-900 hover:text-gray-600 transition-colors duration-200'
          >
            podcasts
          </Link>
        </div>
        <div className='flex items-center space-x-4 text-xs'>
          <Button
            variant='ghost'
            size='sm'
            className='h-auto p-0 text-xs text-gray-600 hover:text-gray-900 hover:bg-transparent'
          >
            <Link
              href='https://github.com/xorforce'
              className='hover:underline'
            >
              github
            </Link>
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='h-auto p-0 text-xs text-gray-600 hover:text-gray-900 hover:bg-transparent'
          >
            <Link
              href='https://twitter.com/soulful_swift'
              className='hover:underline'
            >
              twitter
            </Link>
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='h-auto p-0 text-xs text-gray-600 hover:text-gray-900 hover:bg-transparent'
          >
            <Link
              href='mailto:bhagatsingh2297@gmail.com'
              className='hover:underline'
            >
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
          <p className='text-sm text-gray-600 leading-relaxed mb-12 hover:text-gray-800 transition-colors duration-200'>
            Speaking about iOS development, machine learning, and building
            better mobile experiences.
          </p>

          <div className='space-y-8'>
            <Card className='group hover:bg-gray-50 transition-all duration-200 border-none shadow-none'>
              <CardContent className='p-4'>
                <Link href='#' className='block'>
                  <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                    CoreML on iOS: Building Intelligent Mobile Apps
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>2024</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <MapPin className='w-3 h-3' />
                      <span>iOS Conference</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='w-3 h-3' />
                      <span>300+ attendees</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Deep dive into integrating machine learning capabilities in
                    iOS apps using CoreML framework, covering model integration,
                    performance optimization, and real-world use cases.
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
                        iOS
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
                    GraphQL on iOS: Modern API Integration
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>2023</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <MapPin className='w-3 h-3' />
                      <span>Swift Meetup</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='w-3 h-3' />
                      <span>150+ attendees</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Exploring GraphQL implementation in iOS applications,
                    covering Apollo iOS, query optimization, and best practices
                    for efficient data fetching in mobile apps.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        GraphQL
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Apollo iOS
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        API Design
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
                    Dependency Injection in iOS: Clean Architecture Patterns
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>2023</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <MapPin className='w-3 h-3' />
                      <span>iOS Dev Conference</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='w-3 h-3' />
                      <span>250+ attendees</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Implementing clean dependency injection patterns in iOS
                    applications for better testability, maintainability, and
                    scalable architecture in large codebases.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Dependency Injection
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Clean Architecture
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Testing
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
                    A Touch of Magic: Advanced iOS Animations
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>2022</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <MapPin className='w-3 h-3' />
                      <span>Mobile Dev Summit</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='w-3 h-3' />
                      <span>400+ attendees</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Creating delightful user experiences through advanced
                    animation techniques in iOS, covering Core Animation, custom
                    transitions, and performance optimization.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Animations
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Core Animation
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        UX Design
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
                    Hacking Your Life in 24 Hours: Productivity for Developers
                  </h2>
                  <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>2022</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <MapPin className='w-3 h-3' />
                      <span>Tech Talks India</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='w-3 h-3' />
                      <span>200+ attendees</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                    Practical strategies for optimizing productivity and
                    work-life balance as a software developer, covering time
                    management, automation, and sustainable development
                    practices.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex space-x-2'>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Productivity
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Work-Life Balance
                      </span>
                      <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                        Developer Life
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
              Interested in having me speak at your event?{' '}
              <Button
                variant='ghost'
                size='sm'
                className='h-auto p-0 text-xs text-gray-500 hover:text-gray-900 hover:bg-transparent'
              >
                <Link
                  href='mailto:bhagatsingh2297@gmail.com'
                  className='hover:underline'
                >
                  Get in touch
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
