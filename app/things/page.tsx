"use client"

import { useState, useMemo } from "react"
import Image from "next/image"

export default function Things() {
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "MacBook Pro 16\"",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 2,
        name: "iPhone 15 Pro",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 3,
        name: "Magic Keyboard",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 4,
        name: "AirPods Pro",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 5,
        name: "iPad Pro 12.9\"",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 6,
        name: "Apple Watch Series 9",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 7,
        name: "MX Master 3S",
        category: "Tech",
        brand: "Logitech",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 8,
        name: "Studio Display",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 9,
        name: "AirPods Max",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 10,
        name: "HomePod mini",
        category: "Home",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 11,
        name: "Apple TV 4K",
        category: "Home",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 12,
        name: "AirTag",
        category: "Tech",
        brand: "Apple",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    [],
  )

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], [products])
  const brands = useMemo(() => ["All", ...new Set(products.map((p) => p.brand))], [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand
      return matchesCategory && matchesBrand
    })
  }, [products, selectedCategory, selectedBrand])

  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950">
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Categories and Top Brands */}
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
          <section>
            <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-4">Top brands</h2>
            <ul className="space-y-2 text-sm text-gray-900 dark:text-gray-50">
              {brands.map((brand) => (
                <li key={brand}>
                  <button
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left ${
                      selectedBrand === brand ? "font-bold" : ""
                    } hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200`}
                  >
                    {brand}
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
              <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center aspect-square">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
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