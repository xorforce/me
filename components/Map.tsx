"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface Place {
  id: string
  name: string
  city: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
  category: string
  description: string
  visited: string
}

interface MapProps {
  places: Place[]
  onPlaceClick?: (place: Place) => void
  onMapReady?: (map: google.maps.Map) => void
}

// Generate colored SVG pin for each category
const generateColoredPin = (color: string) => {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <path d="M16 2C10.48 2 6 6.48 6 12c0 7 10 18 10 18s10-11 10-18c0-5.52-4.48-10-10-10z" 
            fill="${color}" stroke="#fff" stroke-width="1" filter="url(#shadow)"/>
      <circle cx="16" cy="12" r="4" fill="#fff"/>
    </svg>
  `)}`
}

const categoryColors = {
  coffee: '#f59e0b',
  attraction: '#3b82f6', 
  food: '#ef4444',
  market: '#10b981'
}

export default function MapComponent({ places, onPlaceClick, onMapReady }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
        setError('Google Maps API key not configured')
        setIsLoading(false)
        return
      }

      const loader = new Loader({ apiKey, version: 'weekly', libraries: ['places'] })

      try {
        setIsLoading(true)
        const google = await loader.load()
        await new Promise(resolve => setTimeout(resolve, 300)) // Delay for DOM readiness

        if (!mapRef.current) {
          setError('Map container not found')
          setIsLoading(false)
          return
        }

        const bounds = new google.maps.LatLngBounds()
        places.forEach(place => bounds.extend(new google.maps.LatLng(place.coordinates.lat, place.coordinates.lng)))

        const googleMap = new google.maps.Map(mapRef.current, {
          center: bounds.getCenter(),
          zoom: 10,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        })
        mapInstanceRef.current = googleMap
        googleMap.fitBounds(bounds, 50)
        
        // Call onMapReady callback
        if (onMapReady) {
          onMapReady(googleMap)
        }

        const markers: google.maps.Marker[] = []
        places.forEach((place, index) => {
          const markerColor = categoryColors[place.category as keyof typeof categoryColors] || '#6b7280'
          const coloredPinUrl = generateColoredPin(markerColor)
          
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(place.coordinates.lat, place.coordinates.lng),
            map: googleMap,
            title: `${place.name}, ${place.city}`,
            icon: {
              url: coloredPinUrl,
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 32),
            }
          })

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; max-width: 200px;">
                <h3 style="margin: 0 0 4px 0; font-weight: bold;">${place.name}</h3>
                <p style="margin: 0 0 4px 0; color: #666;">${place.city}, ${place.country}</p>
                <p style="margin: 0 0 4px 0; font-size: 12px;">${place.description}</p>
                <p style="margin: 0; font-size: 11px; color: #999;">Visited: ${place.visited}</p>
              </div>
            `
          })

          marker.addListener('click', () => {
            infoWindow.open(googleMap, marker)
            if (onPlaceClick) {
              onPlaceClick(place)
            }
          })

          markers.push(marker)
        })
        markersRef.current = markers
        setIsLoading(false)
      } catch (error) {
        setError(`Failed to load Google Maps: ${error instanceof Error ? error.message : 'Unknown error'}`)
        setIsLoading(false)
      }
    }

    if (places.length > 0) {
      initMap()
    } else {
      setIsLoading(false)
    }

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []
    }
  }, [places, onPlaceClick, onMapReady])

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-red-600 dark:text-red-400 mb-2">Map Unavailable</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
} 