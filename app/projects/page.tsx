import Link from "next/link"
import { Button } from "@/components/ui/button"
import projectsData from "@/data/projects.json"

export default function Projects() {
  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950">
      {/* Navigation */}
      <nav className="flex items-center justify-end px-8 py-6 max-w-4xl mx-auto text-sm">
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
      <main className="max-w-4xl mx-auto px-8 py-12 animate-in fade-in duration-500">
        <section className="mb-0">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-50 mb-8 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            Projects
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">
            A collection of projects from my GitHub repositories, showcasing my work across iOS, Android, web development, and community contributions.
          </p>

          {/* Collaboration Section */}
        <div className="mb-8">
          <p className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200">
            Interested in collaborating on a project?{' '}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-gray-500 hover:text-gray-900 hover:bg-transparent"
            >
              <Link href="mailto:bhagatsingh2297@gmail.com" className="hover:underline">
                Get in touch
              </Link>
            </Button>
          </p>
        </div>

                    <div className="space-y-20">
            {projectsData.projects
              .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
              .filter(project => new Date(project.updated).getFullYear() >= 2023)
              .map((project) => (
                <Link key={project.id} href={project.url} target="_blank" rel="noopener noreferrer">
                  <div className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 p-6 rounded-lg hover:scale-[1.005] transition-transform duration-200 cursor-pointer">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* Archive Section */}
          <div className="mt-16">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
              Archive
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">
              These projects are no longer maintained, were created for hackathons, or are simply too old to represent my current work. They're kept here for historical reference.
            </p>
            <div className="space-y-20">
              {projectsData.projects
                .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
                .filter(project => new Date(project.updated).getFullYear() < 2023)
                .map((project) => (
                  <Link key={project.id} href={project.url} target="_blank" rel="noopener noreferrer">
                    <div className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 p-6 rounded-lg hover:scale-[1.005] transition-transform duration-200 cursor-pointer">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex justify-center items-center text-xs text-gray-500 dark:text-gray-400">
            <p>© 2024 Bhagat Singh</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 