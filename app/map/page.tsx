"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MapComponent from "@/components/Map"
import { useState, useCallback } from "react"

// Sample data - updated with more places
const visitedPlaces = [
  // San Francisco
  {
    id: "blue-bottle",
    name: "Blue Bottle Coffee",
    city: "San Francisco",
    country: "USA",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    category: "coffee",
    description: "Amazing pour-over coffee with a minimalist aesthetic",
    visited: "2024"
  },
  {
    id: "golden-gate",
    name: "Golden Gate Bridge",
    city: "San Francisco",
    country: "USA",
    coordinates: { lat: 37.8199, lng: -122.4783 },
    category: "attraction",
    description: "Iconic suspension bridge spanning the Golden Gate",
    visited: "2024"
  },
  {
    id: "fishermans-wharf",
    name: "Fisherman's Wharf",
    city: "San Francisco",
    country: "USA",
    coordinates: { lat: 37.8080, lng: -122.4177 },
    category: "attraction",
    description: "Historic waterfront area with seafood restaurants",
    visited: "2024"
  },
  {
    id: "alcatraz",
    name: "Alcatraz Island",
    city: "San Francisco",
    country: "USA",
    coordinates: { lat: 37.8270, lng: -122.4230 },
    category: "attraction",
    description: "Famous former federal prison on an island",
    visited: "2024"
  },
  {
    id: "chinatown",
    name: "Chinatown",
    city: "San Francisco",
    country: "USA",
    coordinates: { lat: 37.7941, lng: -122.4079 },
    category: "market",
    description: "Largest Chinatown outside of Asia",
    visited: "2024"
  },
  {
    id: "pier-39",
    name: "Pier 39",
    city: "San Francisco",
    country: "USA",
    coordinates: { lat: 37.8087, lng: -122.4098 },
    category: "attraction",
    description: "Popular tourist destination with sea lions",
    visited: "2024"
  },
  // Seattle
  {
    id: "space-needle",
    name: "Space Needle",
    city: "Seattle",
    country: "USA",
    coordinates: { lat: 47.6205, lng: -122.3493 },
    category: "attraction",
    description: "Iconic observation tower and landmark",
    visited: "2024"
  },
  {
    id: "pike-place",
    name: "Pike Place Market",
    city: "Seattle",
    country: "USA",
    coordinates: { lat: 47.6097, lng: -122.3421 },
    category: "market",
    description: "Historic public market overlooking Elliott Bay",
    visited: "2024"
  },
  {
    id: "starbucks-reserve",
    name: "Starbucks Reserve Roastery",
    city: "Seattle",
    country: "USA",
    coordinates: { lat: 47.6163, lng: -122.3556 },
    category: "coffee",
    description: "Premium coffee experience and roastery",
    visited: "2024"
  },
  {
    id: "chihuly-garden",
    name: "Chihuly Garden and Glass",
    city: "Seattle",
    country: "USA",
    coordinates: { lat: 47.6204, lng: -122.3511 },
    category: "attraction",
    description: "Glass art museum and garden",
    visited: "2024"
  },
  {
    id: "kerry-park",
    name: "Kerry Park",
    city: "Seattle",
    country: "USA",
    coordinates: { lat: 47.6304, lng: -122.3654 },
    category: "attraction",
    description: "Best view of Seattle skyline and Space Needle",
    visited: "2024"
  },
  {
    id: "fremont-brewing",
    name: "Fremont Brewing",
    city: "Seattle",
    country: "USA",
    coordinates: { lat: 47.6492, lng: -122.3513 },
    category: "food",
    description: "Local craft brewery with great beer garden",
    visited: "2024"
  },
  // Hong Kong
  {
    id: "victoria-peak",
    name: "Victoria Peak",
    city: "Hong Kong",
    country: "Hong Kong",
    coordinates: { lat: 22.2783, lng: 114.1747 },
    category: "attraction",
    description: "Highest point on Hong Kong Island with stunning views",
    visited: "2024"
  },
  {
    id: "central-market",
    name: "Central Market",
    city: "Hong Kong",
    country: "Hong Kong",
    coordinates: { lat: 22.2789, lng: 114.1745 },
    category: "market",
    description: "Historic market building with local vendors",
    visited: "2024"
  },
  {
    id: "temple-street",
    name: "Temple Street Night Market",
    city: "Hong Kong",
    country: "Hong Kong",
    coordinates: { lat: 22.3193, lng: 114.1694 },
    category: "market",
    description: "Famous night market with street food and souvenirs",
    visited: "2024"
  },
  {
    id: "dim-sum",
    name: "Tim Ho Wan",
    city: "Hong Kong",
    country: "Hong Kong",
    coordinates: { lat: 22.3193, lng: 114.1694 },
    category: "food",
    description: "World's cheapest Michelin-starred dim sum",
    visited: "2024"
  },
  {
    id: "hong-kong-cafe",
    name: "Australian Dairy Company",
    city: "Hong Kong",
    country: "Hong Kong",
    coordinates: { lat: 22.3193, lng: 114.1694 },
    category: "food",
    description: "Famous for scrambled eggs and milk tea",
    visited: "2024"
  },
  {
    id: "coffee-academy",
    name: "Cupping Room",
    city: "Hong Kong",
    country: "Hong Kong",
    coordinates: { lat: 22.3193, lng: 114.1694 },
    category: "coffee",
    description: "Specialty coffee shop with award-winning baristas",
    visited: "2024"
  }
]

const categories = [
  { name: "Coffee Shops", color: "bg-amber-500", count: 3 },
  { name: "Attractions", color: "bg-blue-500", count: 8 },
  { name: "Food Spots", color: "bg-red-500", count: 3 },
  { name: "Markets", color: "bg-green-500", count: 4 }
]

// Get unique cities with their coordinates
const getUniqueCities = (): Array<{ name: string; country: string; coordinates: { lat: number; lng: number }; count: number }> => {
  const citiesMap = new Map<string, { name: string; country: string; coordinates: { lat: number; lng: number }; count: number }>()
  visitedPlaces.forEach(place => {
    const key = `${place.city}, ${place.country}`
    if (!citiesMap.has(key)) {
      citiesMap.set(key, {
        name: place.city,
        country: place.country,
        coordinates: place.coordinates,
        count: 1
      })
    } else {
      const existing = citiesMap.get(key)!
      existing.count++
    }
  })
  return Array.from(citiesMap.values())
}

// Flag emoji mapping
const getFlagEmoji = (country: string) => {
  const flagMap: { [key: string]: string } = {
    "USA": "🇺🇸",
    "Hong Kong": "🇭🇰",
    "Canada": "🇨🇦",
    "UK": "🇬🇧",
    "France": "🇫🇷",
    "Germany": "🇩🇪",
    "Italy": "🇮🇹",
    "Spain": "🇪🇸",
    "Japan": "🇯🇵",
    "South Korea": "🇰🇷",
    "Australia": "🇦🇺",
    "New Zealand": "🇳🇿",
    "Singapore": "🇸🇬",
    "Thailand": "🇹🇭",
    "Vietnam": "🇻🇳",
    "India": "🇮🇳",
    "China": "🇨🇳",
    "Mexico": "🇲🇽",
    "Brazil": "🇧🇷",
    "Argentina": "🇦🇷"
  }
  return flagMap[country] || "🌍"
}

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<any>(null)
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)
  const uniqueCities = getUniqueCities()

  const handlePlaceClick = useCallback((place: any) => {
    setSelectedPlace(place)
  }, [])

  const handleMapReady = useCallback((map: google.maps.Map) => {
    setMapInstance(map)
  }, [])

  const handleCityClick = useCallback((city: { name: string; country: string; coordinates: { lat: number; lng: number }; count: number }) => {
    if (mapInstance) {
      mapInstance.panTo({ lat: city.coordinates.lat, lng: city.coordinates.lng })
      mapInstance.setZoom(12)
    }
  }, [mapInstance])

  return (
    <div className="h-screen w-screen bg-background font-mono dark:bg-gray-950 relative overflow-hidden">
      {/* Navigation - Fixed at top */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 text-sm bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <Link href="/" className="hover:underline">
          ← back
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-medium">Places I've Visited</h1>
        </div>
        <div className="w-16"></div> {/* Spacer for centering */}
      </nav>

      {/* Map Background */}
      <div className="absolute inset-0">
        <MapComponent 
          places={visitedPlaces} 
          onPlaceClick={handlePlaceClick}
          onMapReady={handleMapReady}
        />
      </div>

      {/* Overlay List - Left Side */}
      <div className="absolute left-0 top-0 h-full w-96 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-6 pt-24">
          <h2 className="text-xl font-semibold mb-2">Places I've Visited</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            A collection of memorable places I've explored around the world.
          </p>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category.name} variant="secondary" className={`${category.color} text-white`}>
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>
          </div>

          {/* Travel Stats */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Travel Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold">{visitedPlaces.length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Places</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold">{uniqueCities.length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Cities</div>
              </div>
            </div>
          </div>

          {/* All Places */}
          <div>
            <h3 className="text-sm font-medium mb-3">All Places</h3>
            <div className="space-y-3">
              {visitedPlaces.map((place) => (
                <div key={place.id} className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{place.name}</h4>
                      <Badge 
                        variant="secondary" 
                        className={`mt-1 ${  // Added mt-1 for a small top margin
                          place.category === 'coffee' ? 'bg-amber-500' :
                          place.category === 'attraction' ? 'bg-blue-500' :
                          place.category === 'food' ? 'bg-red-500' :
                          'bg-green-500'
                        } text-white text-xs`}
                      >
                        {place.category === 'coffee' ? 'Coffee Shops' :
                         place.category === 'attraction' ? 'Attractions' :
                         place.category === 'food' ? 'Food Spots' : 'Markets'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {place.city}, {place.country}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                    {place.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-600">
                    Visited: {place.visited}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* City Tags Overlay - Top Left */}
      <div className="absolute top-20 left-10 z-40" style={{ left: '25rem' }}>
        <div className="bg-transparent backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex gap-2 overflow-x-auto max-w-md">
            {uniqueCities.map((city, index) => (
              <button
                key={`${city.name}-${city.country}`}
                onClick={() => handleCityClick(city)}
                className="flex items-center gap-1 px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap border border-gray-200 dark:border-gray-600"
              >
                <span className="text-sm">{getFlagEmoji(city.country)}</span>
                <span>{city.name}</span>
                <span className="text-gray-500">({city.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Controls - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-40">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Interactive Map
          </div>
          <div className="text-sm font-medium">
            {visitedPlaces.length} locations
          </div>
        </div>
      </div>
    </div>
  )
} 