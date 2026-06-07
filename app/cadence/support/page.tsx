import Link from "next/link"
import { SubpageShell } from "@/components/subpage-shell"

export const metadata = {
  title: "Support — Cadence",
  description: "Get help with Cadence, the personal habit tracking app.",
}

export default function CadenceSupport() {
  return (
    <SubpageShell
      title="Support"
      description="Need help with Cadence? Here's how to reach us and answers to common questions."
    >
      <section className="space-y-3">
        <h2 className="site-section-title">Contact</h2>
        <p className="site-body-copy">
          The fastest way to reach us is by email at{" "}
          <Link href="mailto:bhagatmakesapps@gmail.com" className="site-inline-link">
            bhagatmakesapps@gmail.com
          </Link>
          . We try to respond within a couple of days.
        </p>
      </section>

      <section className="space-y-3 mt-12">
        <h2 className="site-section-title">Frequently asked questions</h2>

        <div className="space-y-6">
          <div>
            <h3 className="site-card-title mb-1">How do I reset a habit's streak?</h3>
            <p className="site-body-copy">
              Open the habit, tap the streak counter, and choose "Reset
              streak" from the menu.
            </p>
          </div>

          <div>
            <h3 className="site-card-title mb-1">What's the difference between Cadence and Cadence Pro?</h3>
            <p className="site-body-copy">
              The free version gives you a limited preview of Cadence. Cadence
              Pro unlocks full, unrestricted access to the app for the
              duration of your subscription.
            </p>
          </div>

          <div>
            <h3 className="site-card-title mb-1">How do I cancel my subscription?</h3>
            <p className="site-body-copy">
              Subscriptions are managed through the App Store. Open Settings →
              your name → Subscriptions on your device to make changes.
            </p>
          </div>

          <div>
            <h3 className="site-card-title mb-1">Does Cadence sync across devices?</h3>
            <p className="site-body-copy">
              Syncing is on the roadmap. For now, your habits are stored on
              your device.
            </p>
          </div>
        </div>

        <p className="site-body-copy">
          Have a question that's not answered here?{" "}
          <Link href="mailto:bhagatmakesapps@gmail.com" className="site-inline-link">
            Reach out
          </Link>{" "}
          and we'll help you out.
        </p>
      </section>

      <section className="space-y-3 mt-12">
        <h2 className="site-section-title">More</h2>
        <p className="site-body-copy">
          <Link href="/cadence" className="site-inline-link">
            Cadence
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
