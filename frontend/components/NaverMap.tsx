'use client'

import { useEffect, useRef } from 'react'

interface Location {
  latitude: number
  longitude: number
  name: string
  title?: string
}

interface NaverMapProps {
  locations: Location[]
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
}

// Naver Maps 타입 선언
declare global {
  interface Window {
    naver: any
  }
}

export default function NaverMap({
  locations,
  center = { lat: 37.1, lng: 126.7 }, // 화성시 중심
  zoom = 11,
  height = '400px'
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    // Naver Maps API 스크립트 로드
    const loadNaverMapsScript = () => {
      return new Promise<void>((resolve, reject) => {
        // 이미 로드되었는지 확인
        if (window.naver && window.naver.maps) {
          resolve()
          return
        }

        const script = document.createElement('script')
        const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID

        if (!clientId) {
          reject(new Error('Naver Maps Client ID is not configured'))
          return
        }

        // ncpKeyId 파라미터 사용 (최신 API v3)
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load Naver Maps script'))

        document.head.appendChild(script)
      })
    }

    // 지도 초기화
    const initMap = async () => {
      try {
        await loadNaverMapsScript()

        if (!mapRef.current || !window.naver || !window.naver.maps) {
          console.error('Map container or Naver Maps API not available')
          return
        }

        // 지도 생성
        const map = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(center.lat, center.lng),
          zoom: zoom,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT
          }
        })

        mapInstanceRef.current = map

        // 기존 마커 제거
        markersRef.current.forEach(marker => marker.setMap(null))
        markersRef.current = []

        // 새 마커 추가
        locations.forEach((location, index) => {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(location.latitude, location.longitude),
            map: map,
            title: location.title || location.name,
            icon: {
              content: `
                <div style="
                  background-color: #16a34a;
                  color: white;
                  padding: 8px 12px;
                  border-radius: 20px;
                  font-size: 12px;
                  font-weight: bold;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  white-space: nowrap;
                ">
                  ${location.name}
                </div>
              `,
              size: new window.naver.maps.Size(22, 35),
              anchor: new window.naver.maps.Point(11, 35)
            }
          })

          // 정보창 추가
          const infoWindow = new window.naver.maps.InfoWindow({
            content: `
              <div style="padding: 10px; min-width: 150px;">
                <h4 style="margin: 0 0 5px 0; font-size: 14px; font-weight: bold;">
                  ${location.title || location.name}
                </h4>
                <p style="margin: 0; font-size: 12px; color: #666;">
                  ${location.name}
                </p>
              </div>
            `
          })

          // 마커 클릭 이벤트
          window.naver.maps.Event.addListener(marker, 'click', () => {
            if (infoWindow.getMap()) {
              infoWindow.close()
            } else {
              infoWindow.open(map, marker)
            }
          })

          markersRef.current.push(marker)
        })

        // 모든 마커가 보이도록 지도 범위 조정
        if (locations.length > 0) {
          const bounds = new window.naver.maps.LatLngBounds()
          locations.forEach(location => {
            bounds.extend(new window.naver.maps.LatLng(location.latitude, location.longitude))
          })
          map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 })
        }
      } catch (error) {
        console.error('Failed to initialize Naver Map:', error)
      }
    }

    initMap()

    // 컴포넌트 언마운트 시 마커 정리
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []
    }
  }, [locations, center.lat, center.lng, zoom])

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} style={{ width: '100%', height }} />
    </div>
  )
}
