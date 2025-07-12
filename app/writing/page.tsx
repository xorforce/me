import Link from 'next/link';

export default function Writing() {
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
        </div>
        <div className='flex items-center space-x-4 text-xs'>
          <Link
            href='https://github.com/xorforce'
            className='text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline'
          >
            github
          </Link>
          <Link
            href='https://twitter.com/soulful_swift'
            className='text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline'
          >
            twitter
          </Link>
          <Link
            href='mailto:bhagatsingh2297@gmail.com'
            className='text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline'
          >
            email
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className='max-w-2xl mx-auto px-8 py-12 animate-in fade-in duration-500'>
        <section className='mb-16'>
          <h1 className='text-2xl font-medium text-gray-900 mb-4 hover:text-gray-700 transition-colors duration-300'>
            Writing
          </h1>
          <p className='text-sm text-gray-600 leading-relaxed mb-12 hover:text-gray-800 transition-colors duration-200'>
            Thoughts on iOS development, SwiftUI, and building better mobile
            experiences.
          </p>

          <div className='space-y-8'>
            <article className='group hover:bg-gray-50 transition-all duration-200 p-4 -m-4 rounded-lg'>
              <Link href='/writing/coreml-ios-guide' className='block'>
                <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                  CoreML on iOS: A Complete Integration Guide
                </h2>
                <div className='text-xs text-gray-500 mb-3'>
                  December 15, 2024 • 8 min read
                </div>
                <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                  Deep dive into integrating machine learning capabilities in
                  iOS apps using CoreML framework. From model preparation to
                  performance optimization, learn how to build intelligent
                  mobile applications that leverage the power of on-device ML.
                </p>
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
              </Link>
            </article>

            <article className='group hover:bg-gray-50 transition-all duration-200 p-4 -m-4 rounded-lg'>
              <Link href='/writing/swiftui-design-patterns' className='block'>
                <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                  SwiftUI Design Patterns for Scalable Apps
                </h2>
                <div className='text-xs text-gray-500 mb-3'>
                  December 8, 2024 • 12 min read
                </div>
                <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                  Advanced SwiftUI patterns and architectural decisions that
                  help build maintainable, scalable iOS applications. Explore
                  MVVM, coordinators, dependency injection, and state management
                  strategies that work in production.
                </p>
                <div className='flex space-x-2'>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    SwiftUI
                  </span>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    Architecture
                  </span>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    Design Patterns
                  </span>
                </div>
              </Link>
            </article>

            <article className='group hover:bg-gray-50 transition-all duration-200 p-4 -m-4 rounded-lg'>
              <Link href='/writing/dependency-injection-ios' className='block'>
                <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                  Dependency Injection in iOS: A Practical Guide
                </h2>
                <div className='text-xs text-gray-500 mb-3'>
                  November 28, 2024 • 6 min read
                </div>
                <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                  Implementing clean dependency injection patterns in iOS
                  applications for better testability and maintainability. Learn
                  how to structure your code for scalability while keeping it
                  simple and understandable.
                </p>
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
              </Link>
            </article>

            <article className='group hover:bg-gray-50 transition-all duration-200 p-4 -m-4 rounded-lg'>
              <Link href='/writing/graphql-ios-apollo' className='block'>
                <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                  GraphQL on iOS: Modern API Integration with Apollo
                </h2>
                <div className='text-xs text-gray-500 mb-3'>
                  November 15, 2024 • 9 min read
                </div>
                <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                  Master GraphQL implementation in iOS applications using Apollo
                  iOS. Learn query optimization, caching strategies, and best
                  practices for efficient data fetching in mobile apps.
                </p>
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
              </Link>
            </article>

            <article className='group hover:bg-gray-50 transition-all duration-200 p-4 -m-4 rounded-lg'>
              <Link
                href='/writing/ios-animations-core-animation'
                className='block'
              >
                <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                  Advanced iOS Animations: Beyond the Basics
                </h2>
                <div className='text-xs text-gray-500 mb-3'>
                  October 30, 2024 • 7 min read
                </div>
                <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                  Creating delightful user experiences through advanced
                  animation techniques in iOS. Explore Core Animation, custom
                  transitions, and performance optimization for smooth, engaging
                  interfaces.
                </p>
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
              </Link>
            </article>

            <article className='group hover:bg-gray-50 transition-all duration-200 p-4 -m-4 rounded-lg'>
              <Link href='/writing/ios-design-systems' className='block'>
                <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                  Building Design Systems for iOS Apps
                </h2>
                <div className='text-xs text-gray-500 mb-3'>
                  October 12, 2024 • 8 min read
                </div>
                <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                  Creating consistent, scalable design systems for iOS
                  applications. Learn how to build reusable components,
                  establish design tokens, and maintain visual consistency
                  across your mobile app ecosystem.
                </p>
                <div className='flex space-x-2'>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    Design Systems
                  </span>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    iOS Design
                  </span>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    Component Libraries
                  </span>
                </div>
              </Link>
            </article>

            <article className='group hover:bg-gray-50 transition-all duration-200 p-4 -m-4 rounded-lg'>
              <Link href='/writing/mastering-git-workflows' className='block'>
                <h2 className='text-lg font-medium text-gray-900 group-hover:text-gray-600 mb-2 transition-colors duration-200'>
                  Mastering Git: Workflows for iOS Development Teams
                </h2>
                <div className='text-xs text-gray-500 mb-3'>
                  September 25, 2024 • 10 min read
                </div>
                <p className='text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200'>
                  Advanced Git workflows and best practices for iOS development
                  teams. From branching strategies to code review processes,
                  learn how to optimize your team's collaboration and code
                  quality.
                </p>
                <div className='flex space-x-2'>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    Git
                  </span>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    Team Collaboration
                  </span>
                  <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200'>
                    Development Workflows
                  </span>
                </div>
              </Link>
            </article>
          </div>
        </section>

        <section>
          <div className='text-center py-8'>
            <p className='text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200'>
              More articles coming soon. Follow me on{' '}
              <Link
                href='https://twitter.com/soulful_swift'
                className='hover:text-gray-900 transition-colors duration-200 hover:underline'
              >
                Twitter
              </Link>{' '}
              for updates.
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
              <Link
                href='/about'
                className='hover:text-gray-900 transition-colors duration-200 hover:underline'
              >
                about
              </Link>
              <Link
                href='mailto:bhagatsingh2297@gmail.com'
                className='hover:text-gray-900 transition-colors duration-200 hover:underline'
              >
                contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
