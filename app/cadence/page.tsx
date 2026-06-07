import Link from "next/link"
import { SubpageShell } from "@/components/subpage-shell"

export const metadata = {
  title: "Cadence — A personal habit tracker",
  description: "Cadence is a personal habit tracking app for forming good habits.",
}

export default function CadenceMarketing() {
  return (
    <SubpageShell
      title="Cadence"
      description="A personal habit tracking app for forming good habits, one day at a time."
    >
      <section className="space-y-6">
        <h2 className="site-section-title">Why Cadence</h2>
        <div className="space-y-6">
          <div className="group site-card p-4 -m-4">
            <h3 className="site-card-title mb-2">Build streaks that stick</h3>
            <p className="site-card-copy">
              Track the habits that matter to you and watch your streaks grow
              day after day.
            </p>
          </div>

          <div className="group site-card p-4 -m-4">
            <h3 className="site-card-title mb-2">Simple, focused design</h3>
            <p className="site-card-copy">
              No clutter, no noise — just a clear view of what you're working
              on and how you're doing.
            </p>
          </div>

          <div className="group site-card p-4 -m-4">
            <h3 className="site-card-title mb-2">Private by default</h3>
            <p className="site-card-copy">
              Cadence collects no activity data that can be linked back to
              you. Your habits are yours alone.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3 mt-12">
        <h2 className="site-section-title">Get Cadence</h2>
        <p className="site-body-copy">
          Cadence is available now.{" "}
          <Link href="#" className="site-inline-link">
            Download on the App Store
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3 mt-12">
        <h2 className="site-section-title">More</h2>
        <p className="site-body-copy">
          <Link href="/cadence/support" className="site-inline-link">
            Support
          </Link>
          {" · "}
          <Link href="/cadence/privacy" className="site-inline-link">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/cadence/terms" className="site-inline-link">
            Terms of Use
          </Link>
        </p>
      </section>
    </SubpageShell>
  )
}
