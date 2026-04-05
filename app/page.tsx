"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const HOME_SECTIONS_STORAGE_KEY = "home-open-sections"
const defaultOpenSections = {
  About: true,
  Work: false,
  EverythingElse: false,
  Contact: false,
}

export default function Portfolio() {
  const [openSections, setOpenSections] = useState(defaultOpenSections)
  const [hasLoadedSectionState, setHasLoadedSectionState] = useState(false)

  const aboutContent = [
    <>
      I&apos;m a product obsessed iOS Engineer with a strong bias for design and clarity.
      I&apos;ve worked across user products used by millions at{" "}
      <Link
        href="https://www.phonepe.com/"
        target="_blank"
        rel="noreferrer"
        className="home-link"
      >
        PhonePe
      </Link>{" "}
      and{" "}
      <Link
        href="https://www.zomato.com/"
        target="_blank"
        rel="noreferrer"
        className="home-link"
      >
        Zomato
      </Link>
      , and contributed to{" "}
      <Link
        href="https://www.kodeco.com/u/bhagat"
        target="_blank"
        rel="noreferrer"
        className="home-link"
      >
        Kodeco
      </Link>{" "}
      as a content specialist.
    </>,
    <>
      Outside work, I am usually doing one of a few predictable or <i>unpredictable</i>{" "}
      things. If you want the longer version, check out{" "}
      <Link
        href="#everything-else"
        onClick={() => openSection("EverythingElse")}
        className="home-link"
      >
        [everything else]
      </Link>{" "}
      for more.
    </>,
  ]

  const workContent = [
    <>
      Work for me is rarely just one lane. I work a full time{" "}
      <Link href="/work" className="home-link">
        9-5
      </Link>
      {" "}and try to save some room for{" "}
      <Link href="/projects" className="home-link">
        side quests
      </Link>
      . I also make{" "}
      <Link href="/appearances" className="home-link">
        public appearances
      </Link>{" "}
      where I get to talk about the things I am learning, building, or still trying to
      make sense of.
    </>,
  ]

  const everythingElseContent = [
    <>
      I sometimes{" "}
      <Link href="/writing" className="home-link">
      write
      </Link>
      {" "}my thoughts about tech and anything in general.
      I rely on a{" "}
      <Link href="/uses" className="home-link">
      few things
      </Link>
      {" "}everyday, keep an {" "}
      <Link href="/inventory" className="home-link">
        inventory
      </Link>
      {" "}of what I carry, use and display, and{" "}
      <Link href="/inventory" className="home-link">
        collect
      </Link>
      {" "}a few from around the world.
    </>,
    <>
    I also{" "}
      <Link href="/djing" className="home-link">
        DJ
      </Link>{" "}
      professionally (getting there) and have performed in Bengaluru. 
      For me, it's about curating tasteful music and making the room feel right.
    </>,
  ]

  const sections = [
    {
      key: "Work",
      label: "Work",
      id: "work",
      content: workContent,
    },
    {
      key: "EverythingElse",
      label: "Everything else",
      id: "everything-else",
      content: everythingElseContent,
    },
  ] as const

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }))
  }

  const openSection = (section: keyof typeof openSections) => {
    setOpenSections((current) => ({
      ...current,
      [section]: true,
    }))
  }

  useEffect(() => {
    const savedSectionState = window.sessionStorage.getItem(HOME_SECTIONS_STORAGE_KEY)

    if (savedSectionState) {
      try {
        const parsedState = JSON.parse(savedSectionState) as Partial<typeof defaultOpenSections>

        setOpenSections({
          ...defaultOpenSections,
          ...parsedState,
        })
      } catch {
        window.sessionStorage.removeItem(HOME_SECTIONS_STORAGE_KEY)
      }
    }

    setHasLoadedSectionState(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedSectionState) {
      return
    }

    window.sessionStorage.setItem(HOME_SECTIONS_STORAGE_KEY, JSON.stringify(openSections))
  }, [hasLoadedSectionState, openSections])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-3xl items-start px-6 py-24 sm:px-10">
        <section className="home-editorial w-full animate-in fade-in duration-500">
          <h1 className="home-name">Bhagat Singh</h1>
          <p className="home-deck">
            I build software with a bias toward clarity, useful interfaces, and systems that hold up.
          </p>

          <div className="space-y-5">
            <section id="about">
              <button
                type="button"
                onClick={() => toggleSection("About")}
                className="home-section-label"
              >
                [About]
              </button>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                  openSections.About ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="home-section-copy">
                  {aboutContent.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>

            {sections.map((section) => (
              <section key={section.key} id={section.id}>
                <button
                  type="button"
                  onClick={() => toggleSection(section.key)}
                  className="home-section-label"
                >
                  [{section.label}]
                </button>
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    openSections[section.key] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="home-section-copy">
                    {section.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <footer id="contact" className="mt-5 text-[13px] leading-6 text-white">
            <button
              type="button"
              onClick={() => toggleSection("Contact")}
              className="home-section-label"
            >
              [Contact]
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                openSections.Contact ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="home-contact-list">
                <Link href="mailto:bhagatsingh2297@gmail.com" className="home-link">
                  email
                </Link>
                <Link href="https://twitter.com/soulful_swift" className="home-link">
                  X
                </Link>
                <Link href="https://linkedin.com/in/ibhagatsingh" className="home-link">
                  LinkedIn
                </Link>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </main>
  )
}
