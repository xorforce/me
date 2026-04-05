import { SubpageShell } from "@/components/subpage-shell"
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
    <SubpageShell
      title="Inventory"
      maxWidthClass="max-w-5xl"
      contentClassName="pt-2 pb-16 px-4 sm:px-6"
    >
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
              <div className="mt-3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {item.brand}
                </div>
                <div className="site-body-copy mt-1">{item.name}</div>
              </div>
              {item.type === "Gifted" ? (
                <div className="site-subtle-label mt-1">
                  Gifted
                </div>
              ) : null}
            </article>
          ))}
        </section>
    </SubpageShell>
  )
}
