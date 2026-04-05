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
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="site-section-title">
                  {section.title}
                  </h2>
                </div>
                {section.description ? (
                  <p className="site-meta max-w-xs text-right">
                    {section.description}
                  </p>
                ) : null}
              </div>
              <div className="mt-3 space-y-3">
                {section.items.map((item) => (
                  <p key={item.name} className="site-body-copy">
                    <span className="font-medium text-gray-900 dark:text-gray-50">
                      {item.name}
                    </span>{" "}
                    {item.note}
                  </p>
                ))}
              </div>
              <div className="site-divider" />
            </section>
          ))}
        </div>
    </SubpageShell>
  )
}
