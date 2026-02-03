import Link from "next/link"
import { Button } from "@/components/ui/button"
import inventoryData from "@/data/inventory.json"

export default function Inventory() {
  const shuffledItems = [...inventoryData.items]

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffledItems[index], shuffledItems[swapIndex]] = [
      shuffledItems[swapIndex],
      shuffledItems[index],
    ]
  }

  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-6 max-w-5xl mx-auto text-sm">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
        >
          <Link href="/" className="hover:underline flex items-center">
            ← back
          </Link>
        </Button>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <section className="pt-2 pb-12 animate-in fade-in duration-500">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-5">
            Inventory
          </p>
          <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-50 mb-4">
            Inventory
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-2xl">
            {inventoryData.intro}
          </p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            Last updated: {inventoryData.updated}
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {shuffledItems.map((item, index) => (
            <article
              key={`${item.brand}-${item.name}-${item.image || item.img || "placeholder"}`}
              className="group flex flex-col w-full max-w-[260px] mx-auto"
              style={{ animationDelay: `${index * 25}ms` }}
            >
              <div className="relative bg-[#f7f7f7] dark:bg-gray-900/30 border border-transparent h-[260px] max-h-[260px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
                <div
                  className="flex items-center justify-center"
                  style={{ width: `${item.scale || 70}%`, height: `${item.scale || 70}%` }}
                >
                  <img
                    src={item.image || item.img || "/placeholder.svg"}
                    alt={`${item.brand}, ${item.name}`}
                    className="h-full w-auto max-w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-700 dark:text-gray-300">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {item.brand}
                </div>
                <div>{item.name}</div>
              </div>
              {item.type === "Gifted" ? (
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-500">
                  Gifted
                </div>
              ) : null}
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
