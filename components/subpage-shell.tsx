import Link from "next/link"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

type SubpageShellProps = {
  children: ReactNode
  title?: string
  description?: ReactNode
  maxWidthClass?: string
  contentClassName?: string
  showFooterBorder?: boolean
  footerContent?: ReactNode
}

export function SubpageShell({
  children,
  title,
  description,
  maxWidthClass = "max-w-2xl",
  contentClassName = "",
  showFooterBorder = false,
  footerContent,
}: SubpageShellProps) {
  const footerClassName = showFooterBorder ? "border-t border-gray-200 dark:border-gray-800 py-8" : "py-8"

  return (
    <div className="site-shell">
      <nav className={`site-nav ${maxWidthClass}`}>
        <Button
          variant="ghost"
          size="sm"
          className="site-nav-button"
        >
          <Link href="/" className="site-nav-link">
            ← back
          </Link>
        </Button>

        <div className="site-nav-actions">
          <Button
            variant="ghost"
            size="sm"
            className="site-nav-button"
          >
            <Link href="/" className="site-nav-link">
              home
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="site-nav-button"
          >
            <Link href="https://github.com/xorforce" className="site-nav-link">
              github
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="site-nav-button"
          >
            <Link href="https://twitter.com/soulful_swift" className="site-nav-link">
              twitter
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="site-nav-button"
          >
            <Link href="mailto:bhagatsingh2297@gmail.com" className="site-nav-link">
              email
            </Link>
          </Button>
        </div>
      </nav>

      <main className={`site-main ${maxWidthClass} ${contentClassName}`}>
        {title || description ? (
          <section className="mb-16">
            {title ? (
              <h1 className="site-page-title">
                {title}
              </h1>
            ) : null}
            {description ? (
              <div className="site-page-intro">
                {description}
              </div>
            ) : null}
            {children}
          </section>
        ) : (
          children
        )}
      </main>

      <footer className={footerClassName}>
        <div className={`mx-auto px-8 ${maxWidthClass}`}>
          {footerContent ?? (
            <div className="site-footer-note flex items-center justify-center">
              <p>© 2024 Bhagat Singh</p>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
