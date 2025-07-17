import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
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
      <main className="max-w-2xl mx-auto px-8 py-12 animate-in fade-in duration-500">
        <section className="mb-16">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-50 mb-8 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            About
          </h1>

          <div className="space-y-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <p className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200 hover:scale-[1.005] transition-transform duration-200">
              I'm an iOS Engineer with an ever-lasting knack for design. For me,
              a perfect user interface should look good and work even better.
              I'm passionate about uncovering problems and solving them to
              create better mobile applications.
            </p>

            <p className='hover:text-gray-800 transition-colors duration-200'>
              Currently working at PhonePe on the "App Excellence" team, owning
              the App Home page and horizontal tasks such as the design system
              and dev tooling. I was also the founding iOS Engineer for
              "Pincode," an e-commerce app using SwiftUI on the ONDC network.
            </p>

            <p className='hover:text-gray-800 transition-colors duration-200'>
              My journey in iOS development started in 2017, and I've had the
              privilege of working with companies like Zomato and PhonePe,
              building features that serve millions of users. I'm also a
              contributor to Kodeco (formerly raywenderlich.com) as a content
              specialist.
            </p>

            <p className='hover:text-gray-800 transition-colors duration-200'>
              When I'm not coding, I enjoy speaking at conferences, organizing
              Swift India Group meetups, and contributing to the iOS development
              community through articles, books, and courses.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">Experience</h2>

          <div className="space-y-6">
            <div className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 p-3 -m-3 rounded-lg hover:scale-[1.005] transition-transform duration-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  iOS Engineer
                </h3>
                <span className='text-xs text-gray-500'>
                  Aug 2019 - Present
                </span>
              </div>
              <p className='text-xs text-gray-600 mb-1'>PhonePe, Bengaluru</p>
              <p className='text-sm text-gray-600 leading-relaxed mb-2'>
                Working on the "App Excellence" team owning the App Home page,
                and horizontal tasks such as the design system and dev tooling.
              </p>
              <p className='text-sm text-gray-600 leading-relaxed mb-2'>
                Founding iOS Engineer for "Pincode," an e-commerce app using
                SwiftUI on the ONDC network (2022-2024).
              </p>
              <p className='text-sm text-gray-600 leading-relaxed'>
                Developed the "Stores" section to enhance local store
                interactions (2019-2022).
              </p>
            </div>

            <div className='hover:bg-gray-50 transition-colors duration-200 p-3 -m-3 rounded-lg'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='text-sm font-medium text-gray-900'>
                  iOS Engineer
                </h3>
                <span className='text-xs text-gray-500'>
                  Jul 2018 - Jul 2019
                </span>
              </div>
              <p className='text-xs text-gray-600 mb-1'>Zomato, Gurugram</p>
              <p className='text-sm text-gray-600 leading-relaxed'>
                Worked on improving the Online Ordering experience of the app
                while building features like Self Pickup, and the loyalty
                program "Gold".
              </p>
            </div>

            <div className='hover:bg-gray-50 transition-colors duration-200 p-3 -m-3 rounded-lg'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='text-sm font-medium text-gray-900'>
                  Contributor
                </h3>
                <span className='text-xs text-gray-500'>
                  Apr 2017 - Present
                </span>
              </div>
              <p className='text-xs text-gray-600 mb-1'>Kodeco (Remote)</p>
              <p className='text-sm text-gray-600 leading-relaxed'>
                Contributing on the iOS team as a content specialist in
                articles, books and courses.
              </p>
            </div>

            <div className='hover:bg-gray-50 transition-colors duration-200 p-3 -m-3 rounded-lg'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='text-sm font-medium text-gray-900'>
                  iOS Intern
                </h3>
                <span className='text-xs text-gray-500'>
                  Oct 2017 - Jan 2018
                </span>
              </div>
              <p className='text-xs text-gray-600 mb-1'>Zomato, Gurugram</p>
              <p className='text-sm text-gray-600 leading-relaxed'>
                Started my iOS development journey as an intern, learning the
                fundamentals of mobile app development.
              </p>
            </div>

            <div className='hover:bg-gray-50 transition-colors duration-200 p-3 -m-3 rounded-lg'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='text-sm font-medium text-gray-900'>Organiser</h3>
                <span className='text-xs text-gray-500'>
                  Oct 2018 - Present
                </span>
              </div>
              <p className='text-xs text-gray-600 mb-1'>
                Swift India Group, Gurugram
              </p>
              <p className='text-sm text-gray-600 leading-relaxed'>
                Organizing meetups and events for the iOS development community
                in India.
              </p>
            </div>
          </div>
        </section>

        <section className='mb-16'>
          <h2 className='text-lg font-medium text-gray-900 mb-6'>Skills</h2>

          <div className='grid grid-cols-2 gap-6 text-sm'>
            <div className='hover:bg-gray-50 transition-colors duration-200 p-3 -m-3 rounded-lg'>
              <h3 className='font-medium text-gray-900 mb-3'>
                iOS Development
              </h3>
              <ul className='space-y-1 text-gray-600'>
                <li className='hover:text-gray-800 transition-colors duration-200'>
                  Swift / SwiftUI
                </li>
                <li className='hover:text-gray-800 transition-colors duration-200'>
                  UIKit
                </li>
                <li className='hover:text-gray-800 transition-colors duration-200'>
                  CoreML / Vision
                </li>
                <li className='hover:text-gray-800 transition-colors duration-200'>
                  GraphQL
                </li>
              </ul>
            </div>

            <div className='hover:bg-gray-50 transition-colors duration-200 p-3 -m-3 rounded-lg'>
              <h3 className='font-medium text-gray-900 mb-3'>Tools & Others</h3>
              <ul className='space-y-1 text-gray-600'>
                <li className='hover:text-gray-800 transition-colors duration-200'>
                  Xcode
                </li>
                <li className='hover:text-gray-800 transition-colors duration-200'>
                  Git
                </li>
                <li className='hover:text-gray-800 transition-colors duration-200'>
                  Design Systems
                </li>
                <li className='hover:text-gray-800 transition-colors duration-200'>
                  Dev Tooling
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className='mb-16'>
          <h2 className='text-lg font-medium text-gray-900 mb-6'>
            Education & Achievements
          </h2>

          <div className='space-y-4 text-sm'>
            <div className='hover:bg-gray-50 transition-colors duration-200 p-3 -m-3 rounded-lg'>
              <h3 className='font-medium text-gray-900 mb-1'>
                B.Tech (Computer Science)
              </h3>
              <p className='text-xs text-gray-600 mb-2'>GGSIPU</p>
              <p className='text-xs text-gray-600'>
                iOS Engineer Nanodegree - Udacity
              </p>
            </div>

            <div className='hover:bg-gray-50 transition-colors duration-200 p-3 -m-3 rounded-lg'>
              <h3 className='font-medium text-gray-900 mb-2'>Hackathon Wins</h3>
              <ul className='space-y-1 text-xs text-gray-600'>
                <li>
                  Winner - mhacksX, mhacksX nano, vortexIITD, yobiHackTheClimate
                </li>
                <li>Runner-up - hackDTU</li>
                <li>Second Runner-up - O(1)Hack</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-medium text-gray-900 mb-6'>Contact</h2>

          <div className='text-sm text-gray-600 leading-relaxed'>
            <p className='mb-4 hover:text-gray-800 transition-colors duration-200'>
              I'm always interested in hearing about new projects and
              opportunities in iOS development. Feel free to reach out if you'd
              like to work together or discuss mobile development.
            </p>

            <div className='space-y-2'>
              <p>
                <span className='text-gray-900'>Email:</span>{' '}
                <Link
                  href='mailto:bhagatsingh2297@gmail.com'
                  className='hover:text-gray-900 transition-colors duration-200 hover:underline'
                >
                  bhagatsingh2297@gmail.com
                </Link>
              </p>
              <p>
                <span className='text-gray-900'>Phone:</span>{' '}
                <span className='hover:text-gray-800 transition-colors duration-200'>
                  +91 9650980619
                </span>
              </p>
              <p>
                <span className='text-gray-900'>LinkedIn:</span>{' '}
                <Link
                  href='https://linkedin.com/in/ibhagatsingh'
                  className='hover:text-gray-900 transition-colors duration-200 hover:underline'
                >
                  linkedin.com/in/ibhagatsingh
                </Link>
              </p>
              <p>
                <span className='text-gray-900'>Twitter:</span>{' '}
                <Link
                  href='https://twitter.com/soulful_swift'
                  className='hover:text-gray-900 transition-colors duration-200 hover:underline'
                >
                  @soulful_swift
                </Link>
              </p>
              <p>
                <span className='text-gray-900'>GitHub:</span>{' '}
                <Link
                  href='https://github.com/xorforce'
                  className='hover:text-gray-900 transition-colors duration-200 hover:underline'
                >
                  github.com/xorforce
                </Link>
              </p>
            </div>
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
