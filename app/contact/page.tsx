import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Contact() {
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
            Contact
          </h1>

          <div className="space-y-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <p className="mb-4 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">
              I'm always open to new opportunities, collaborations, or just a friendly chat about iOS development, SwiftUI, and mobile app architecture. Feel free to reach out through any of the channels below.
            </p>
            
            <div className="space-y-2">
              <p>
                <span className="text-gray-900 dark:text-gray-50">Email:</span>{" "}
                <Link
                  href="mailto:bhagatsingh2297@gmail.com"
                  className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200 hover:underline hover:underline-offset-4 transition-all duration-200"
                >
                  bhagatsingh2297@gmail.com
                </Link>
              </p>
              <p>
                <span className="text-gray-900 dark:text-gray-50">Twitter:</span>{" "}
                <Link
                  href="https://twitter.com/soulful_swift"
                  className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200 hover:underline hover:underline-offset-4 transition-all duration-200"
                >
                  @soulful_swift
                </Link>
              </p>
              <p>
                <span className="text-gray-900 dark:text-gray-50">GitHub:</span>{" "}
                <Link
                  href="https://github.com/xorforce"
                  className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200 hover:underline hover:underline-offset-4 transition-all duration-200"
                >
                  github.com/xorforce
                </Link>
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">What I'm interested in</h2>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">• iOS development consulting and mentoring</li>
                <li className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">• Speaking opportunities at conferences and meetups</li>
                <li className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">• SwiftUI and modern iOS architecture discussions</li>
                <li className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">• Open source collaboration</li>
                <li className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">• Design system and dev tooling projects</li>
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">Currently</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">
                Working at PhonePe on the "App Excellence" team, focusing on the App Home page and horizontal initiatives like design systems and developer tooling. Also contributing to Kodeco as a content specialist for iOS development resources.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-2xl mx-auto px-8">
          <div className="flex justify-center items-center text-xs text-gray-500 dark:text-gray-400">
            <p>© 2024 Bhagat Singh</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 