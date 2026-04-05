import { SubpageShell } from "@/components/subpage-shell"

export default function Work() {
  return (
    <SubpageShell title="Work" description="A vertical snapshot of the places and projects that have shaped how I build.">
      <section className="space-y-6">
        <h2 className="site-section-title">Experience</h2>

          <div className="space-y-6">
            <div className="group site-card p-4 -m-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="site-card-title">iOS Engineer</h3>
                <span className="site-meta">Aug 2019 - Present</span>
              </div>
              <p className="site-meta mb-1">PhonePe, Bengaluru</p>
              <p className="site-body-copy">
                Now part of the iOS Platforms team, working across app stability, shared app frameworks, architecture decisions, and CI. Previously worked on the App Excellence team owning the app home page and horizontal initiatives such as design system and developer tooling, and was a founding iOS engineer for the Pincode e-commerce app.
              </p>
            </div>

            <div className="group site-card p-4 -m-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="site-card-title">iOS Engineer</h3>
                <span className="site-meta">Jul 2018 - Jul 2019</span>
              </div>
              <p className="site-meta mb-1">Zomato, Gurugram</p>
              <p className="site-body-copy">
                Improved Online Ordering experience and built features like Self Pickup and Gold loyalty program.
              </p>
            </div>

            <div className="group site-card p-4 -m-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="site-card-title">Contributor</h3>
                <span className="site-meta">Apr 2017 - Present</span>
              </div>
              <p className="site-meta mb-1">Kodeco (Remote)</p>
              <p className="site-body-copy">
                Contributing on the iOS team as a content specialist in articles, books and courses.
              </p>
            </div>
          </div>
      </section>
    </SubpageShell>
  )
} 
