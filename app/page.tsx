import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Portfolio() {
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
        {/* Hero */}
        <section className='mb-16'>
          <h1 className='text-2xl font-medium text-gray-900 mb-4 hover:text-gray-700 transition-colors duration-300'>
            Bhagat Singh
          </h1>
          <p className='text-sm text-gray-600 mb-6 leading-relaxed'>
            iOS Engineer with an ever-lasting knack for{' '}
            <span className='text-gray-900 hover:bg-gray-100 transition-all duration-200 px-1 rounded hover:rotate-2 inline-block'>
              design
            </span>
            . For me, a perfect user interface should look{' '}
            <span className='text-gray-900 hover:bg-gray-100 transition-all duration-200 px-1 rounded hover:-rotate-1 inline-block'>
              good
            </span>{' '}
            and work even{' '}
            <span className='text-gray-900 hover:bg-gray-100 transition-all duration-200 px-1 rounded hover:rotate-1 inline-block'>
              better
            </span>
            .
          </p>
          <p className='text-sm text-gray-600 leading-relaxed'>
            Uncovering problems and solving them to create better mobile
            applications. Currently working at PhonePe on the "App Excellence"
            team.
          </p>
        </section>

        {/* Writing */}
        <section className='mb-16'>
          <h2 className='text-lg font-medium text-gray-900 mb-8'>
            Recent Writing
          </h2>
          <div className='space-y-6'>
            <Card className='group hover:bg-gray-50 transition-colors duration-200 border-none shadow-none'>
              <CardContent className='p-3'>
                <Link href='/writing/coreml-ios' className='block'>
                  <h3 className='text-sm font-medium text-gray-900 group-hover:text-gray-600 mb-1 transition-colors duration-200'>
                    CoreML on iOS: Building Intelligent Mobile Apps
                  </h3>
                  <div className='text-xs text-gray-500 mb-2'>
                    Dec 15, 2024 • 8 min
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed'>
                    Exploring machine learning integration in iOS apps using
                    CoreML and Vision frameworks.
                  </p>
                </Link>
              </CardContent>
            </Card>

            <Card className='group hover:bg-gray-50 transition-colors duration-200 border-none shadow-none'>
              <CardContent className='p-3'>
                <Link href='/writing/swiftui-design-patterns' className='block'>
                  <h3 className='text-sm font-medium text-gray-900 group-hover:text-gray-600 mb-1 transition-colors duration-200'>
                    SwiftUI Design Patterns for Scalable Apps
                  </h3>
                  <div className='text-xs text-gray-500 mb-2'>
                    Dec 8, 2024 • 12 min
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed'>
                    Advanced SwiftUI patterns and architectural decisions for
                    building maintainable iOS applications.
                  </p>
                </Link>
              </CardContent>
            </Card>

            <Card className='group hover:bg-gray-50 transition-colors duration-200 border-none shadow-none'>
              <CardContent className='p-3'>
                <Link
                  href='/writing/dependency-injection-ios'
                  className='block'
                >
                  <h3 className='text-sm font-medium text-gray-900 group-hover:text-gray-600 mb-1 transition-colors duration-200'>
                    Dependency Injection in iOS: A Practical Guide
                  </h3>
                  <div className='text-xs text-gray-500 mb-2'>
                    Nov 28, 2024 • 6 min
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed'>
                    Implementing clean dependency injection patterns in iOS apps
                    for better testability and maintainability.
                  </p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects */}
        <section className='mb-16'>
          <h2 className='text-lg font-medium text-gray-900 mb-8'>
            Selected Work
          </h2>
          <div className='space-y-4'>
            <Card className='group hover:bg-gray-50 transition-colors duration-200 border-none shadow-none'>
              <CardContent className='p-0'>
                <Link
                  href='#'
                  className='flex items-center justify-between py-3 px-3 w-full'
                >
                  <div>
                    <h3 className='text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200'>
                      Pincode
                    </h3>
                    <p className='text-xs text-gray-600'>
                      E-commerce app using SwiftUI on ONDC network
                    </p>
                  </div>
                  <span className='text-xs text-gray-500 group-hover:text-gray-900 transition-all duration-200 group-hover:translate-x-1'>
                    view →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className='group hover:bg-gray-50 transition-colors duration-200 border-none shadow-none'>
              <CardContent className='p-0'>
                <Link
                  href='#'
                  className='flex items-center justify-between py-3 px-3 w-full'
                >
                  <div>
                    <h3 className='text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200'>
                      Swift Examples
                    </h3>
                    <p className='text-xs text-gray-600'>
                      Collection of iOS development examples and patterns
                    </p>
                  </div>
                  <span className='text-xs text-gray-500 group-hover:text-gray-900 transition-all duration-200 group-hover:translate-x-1'>
                    view →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className='group hover:bg-gray-50 transition-colors duration-200 border-none shadow-none'>
              <CardContent className='p-0'>
                <Link
                  href='#'
                  className='flex items-center justify-between py-3 px-3 w-full'
                >
                  <div>
                    <h3 className='text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200'>
                      Pokedex
                    </h3>
                    <p className='text-xs text-gray-600'>
                      iOS app showcasing modern Swift development practices
                    </p>
                  </div>
                  <span className='text-xs text-gray-500 group-hover:text-gray-900 transition-all duration-200 group-hover:translate-x-1'>
                    view →
                  </span>
                </Link>
              </CardContent>
            </Card>
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
