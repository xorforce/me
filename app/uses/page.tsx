import { SubpageShell } from "@/components/subpage-shell"
import usesData from "@/data/uses.json"

export default function Uses() {
  return (
    <SubpageShell
      title="Uses"
      description={
        <>
          <p className="max-w-2xl">{usesData.intro}</p>
          <p className="site-subtle-label mt-3">
            Last updated: {usesData.updated}
          </p>
        </>
      }
      maxWidthClass="max-w-3xl"
    >
        <div className="space-y-10">
          {usesData.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <div>
                <h2 className="site-section-title">
                  {section.title}
                </h2>
                {section.description ? (
                  <p className="site-meta mt-1">
                    {section.description}
                  </p>
                ) : null}
              </div>
              <ul className="mt-3 list-none space-y-2">
                {section.items.map((item) => (
                  <li key={item.name} className="site-body-copy flex gap-2">
                    <span aria-hidden="true">-</span>
                    <span className="font-medium text-gray-900 dark:text-gray-50">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="site-divider" />
            </section>
          ))}
        </div>
    </SubpageShell>
  )
}
