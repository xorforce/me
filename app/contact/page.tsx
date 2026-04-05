import Link from "next/link"
import { SubpageShell } from "@/components/subpage-shell"

export default function Contact() {
  return (
    <SubpageShell title="Contact">
      <div className="site-body-copy space-y-6">
            <p className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300">
              Email is easiest. The rest is here too. Bonus points if you want to talk about apps, music, or Shinchan.
            </p>
            
            <div className="space-y-2">
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-50">Email:</span>{" "}
                <Link
                  href="mailto:bhagatsingh2297@gmail.com"
                  className="site-inline-link"
                >
                  bhagatsingh2297@gmail.com
                </Link>
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-50">Twitter:</span>{" "}
                <Link
                  href="https://twitter.com/soulful_swift"
                  className="site-inline-link"
                >
                  @soulful_swift
                </Link>
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-50">GitHub:</span>{" "}
                <Link
                  href="https://github.com/xorforce"
                  className="site-inline-link"
                >
                  github.com/xorforce
                </Link>
              </p>
            </div>
      </div>
    </SubpageShell>
  )
} 
