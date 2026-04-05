import Link from "next/link"
import { SubpageShell } from "@/components/subpage-shell"
import projectsData from "@/data/projects.json"

export default function Projects() {
  return (
    <SubpageShell
      title="Projects"
      description="A running selection from my GitHub repositories across iOS, Android, web experiments, and community work."
      maxWidthClass="max-w-4xl"
    >
      <div className="space-y-20">
            {projectsData.projects
              .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
              .filter(project => new Date(project.updated).getFullYear() >= 2023)
              .map((project) => (
                <Link key={project.id} href={project.url} target="_blank" rel="noopener noreferrer">
                  <div className="group site-card cursor-pointer p-6">
                    <div>
                      <h3 className="site-card-title">
                        {project.title}
                      </h3>
                      <p className="site-body-copy mt-1">
                        {project.description}
                      </p>
                    </div>
                    </div>
                </Link>
              ))}
      </div>
    </SubpageShell>
  )
} 
