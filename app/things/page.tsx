"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import thingsData from "@/data/things.json"

export default function Things() {
  const [shuffledProducts, setShuffledProducts] = useState(thingsData.things)

  useEffect(() => {
    // Shuffle on client-side only to avoid hydration mismatch
    setShuffledProducts(thingsData.things.sort(() => Math.random() - 0.5))
  }, [])

  const products = useMemo(() => shuffledProducts, [shuffledProducts])

  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesCategory
    })
  }, [products, selectedCategory])

  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto text-sm">
        {/* Back Arrow */}
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
        >
          <Link href="/" className="hover:underline flex items-center">
            ← back
          </Link>
        </Button>
        
        <div className="flex items-center space-x-4 text-xs">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="/" className="hover:underline">
              home
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="https://github.com/xorforce" className="hover:underline">
              github
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="https://twitter.com/soulful_swift" className="hover:underline">
              twitter
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="mailto:bhagatsingh2297@gmail.com" className="hover:underline">
              email
            </Link>
          </Button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Categories */}
        <div className="md:col-span-1">
          <section className="mb-8">
            <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-4">Categories</h2>
            <ul className="space-y-2 text-sm text-gray-900 dark:text-gray-50">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left ${
                      selectedCategory === category ? "font-bold" : ""
                    } hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center aspect-square overflow-hidden rounded-lg">
                <div className="flex items-center justify-center" style={{ width: `${product.scale || 70}%`, height: `${product.scale || 70}%` }}>
                  <Image
                    src={product.image || "placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain object-center"
                    unoptimized={true}
                  />
                </div>
              </div>
              <div className="mt-2 text-left">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {product.brand} • {product.category}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-50">{product.name}</div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="md:col-span-3 text-center text-gray-500 dark:text-gray-400">
              No products found for the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 