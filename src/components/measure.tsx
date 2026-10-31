'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { afterLoadAndIdle } from '@/lib/idle'

// Each is its own chunk, fetched only when `Measure` decides to show it.
const Analytics = dynamic(() => import('@vercel/analytics/next').then((m) => m.Analytics))
const SpeedInsights = dynamic(() => import('@vercel/speed-insights/next').then((m) => m.SpeedInsights))

/**
 * Pageview and Core Web Vitals scripts, started after the page has loaded and
 * the main thread is idle, so measuring the page never slows it. Web Vitals are
 * recorded by the browser from the start and read back with `buffered`, so the
 * late start loses nothing; only a visitor who leaves before the page is idle
 * (about 2.5 s at most) goes uncounted.
 */
export function Measure() {
  const [on, setOn] = useState(false)
  useEffect(() => afterLoadAndIdle(() => setOn(true)), [])
  return on ? (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  ) : null
}
