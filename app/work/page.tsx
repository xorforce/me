import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Work() {
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
      <main className="max-w-2xl mx-auto px-8 py-12 animate-in fade-in duration-500">
        <section className="mb-16">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-50 mb-8 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            Selected Work
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-12 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">
            Projects and applications I've built during my iOS development journey.
          </p>

          <div className="space-y-4">
            <Card className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-none shadow-none hover:scale-[1.005] transition-transform duration-200">
              <CardContent className="p-0">
                <Link href="#" className="flex items-center justify-between py-3 px-3 w-full">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                      Pincode
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">E-commerce app using SwiftUI on ONDC network</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-all duration-200 group-hover:translate-x-1">
                    view →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-none shadow-none hover:scale-[1.005] transition-transform duration-200">
              <CardContent className="p-0">
                <Link href="#" className="flex items-center justify-between py-3 px-3 w-full">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                      PhonePe App Excellence
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Home page and design system for millions of users</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-all duration-200 group-hover:translate-x-1">
                    view →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-none shadow-none hover:scale-[1.005] transition-transform duration-200">
              <CardContent className="p-0">
                <Link href="#" className="flex items-center justify-between py-3 px-3 w-full">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                      Swift Examples
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Collection of iOS development examples and patterns</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-all duration-200 group-hover:translate-x-1">
                    view →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-none shadow-none hover:scale-[1.005] transition-transform duration-200">
              <CardContent className="p-0">
                <Link href="#" className="flex items-center justify-between py-3 px-3 w-full">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                      Pokedex iOS
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">iOS app showcasing modern Swift development practices</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-all duration-200 group-hover:translate-x-1">
                    view →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-none shadow-none hover:scale-[1.005] transition-transform duration-200">
              <CardContent className="p-0">
                <Link href="#" className="flex items-center justify-between py-3 px-3 w-full">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                      Zomato Features
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Online ordering, self pickup, and Gold loyalty program</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-all duration-200 group-hover:translate-x-1">
                    view →
                  </span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">Experience</h2>
          
          <div className="space-y-6">
            <div className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 p-3 -m-3 rounded-lg hover:scale-[1.005] transition-transform duration-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">iOS Engineer</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Aug 2019 - Present</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">PhonePe, Bengaluru</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Working on the "App Excellence" team owning the App Home page and horizontal tasks such as design system and dev tooling. Founded iOS development for "Pincode" e-commerce app.
              </p>
            </div>

            <div className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 p-3 -m-3 rounded-lg hover:scale-[1.005] transition-transform duration-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">iOS Engineer</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Jul 2018 - Jul 2019</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Zomato, Gurugram</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Improved Online Ordering experience and built features like Self Pickup and Gold loyalty program.
              </p>
            </div>

            <div className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 p-3 -m-3 rounded-lg hover:scale-[1.005] transition-transform duration-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">Contributor</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Apr 2017 - Present</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Kodeco (Remote)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Contributing on the iOS team as a content specialist in articles, books and courses.
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