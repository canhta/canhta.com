'use client'

import Image from 'next/image'
import { m } from 'motion/react'
import { useState } from 'react'
import type { Build, Locale } from '@/content/types'
import { ease } from '@/lib/motion'
import { statusLabel, statusTone } from '@/lib/status'

/**
 * Frame-zero proof: real product surfaces sitting where a marketing page would
 * otherwise leave dead space.
 *
 * Stacked like a deck of windows rather than laid out in a grid — three products
 * read as a considered body of work, where a three-column grid reads as a thin one.
 * The header bar sits at the top of each card so every name stays legible at rest;
 * proof you cannot read is not proof.
 */

const STEP = 74

export function HeroEvidence({ builds, locale }: { builds: Build[]; locale: Locale }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const stack = builds.slice(0, 3)

  return (
    <div
      className="relative mx-auto h-[400px] w-full max-w-[440px]"
      onMouseLeave={() => setHovered(null)}
    >
      {stack.map((build, i) => {
        const restY = i * STEP
        const isHovered = hovered === build.slug
        const hoveredIndex = stack.findIndex((b) => b.slug === hovered)

        // Cards below the hovered one slide down to open a gap for it.
        const pushed = hoveredIndex !== -1 && i > hoveredIndex ? 26 : 0

        const primary = build.links[0]
        const Card = primary ? m.a : m.div

        return (
          <Card
            key={build.slug}
            {...(primary ? { href: primary.url, target: '_blank', rel: 'noreferrer noopener' } : {})}
            onFocus={() => setHovered(build.slug)}
            onBlur={() => setHovered(null)}
            // No opacity in `initial`: this card carries the priority image, and
            // starting it hidden would gate LCP on the JS bundle and hydration.
            initial={false}
            animate={{
              y: isHovered ? restY - 10 : restY + pushed,
              x: isHovered ? 6 : 0,
            }}
            transition={{ ...ease.spring }}
            style={{ zIndex: isHovered ? 30 : i + 1 }}
            onMouseEnter={() => setHovered(build.slug)}
            className="absolute inset-x-0 top-0 block overflow-hidden rounded-none border border-rule-strong bg-surface shadow-[0_10px_24px_-14px_rgba(22,32,42,0.35)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-2.5">
              <span className="font-mono text-[11px] tracking-[0.1em] uppercase">
                <span className="text-graphite">PART {String(i + 1).padStart(2, '0')} — </span>
                <span className="font-medium">{build.name}</span>
              </span>
              <span className={`font-mono text-[11px] tracking-[0.08em] uppercase ${statusTone(build.status)}`}>
                {statusLabel(build.status, locale)}
              </span>
            </div>
            <Image
              src={build.cover}
              alt=""
              width={1200}
              height={750}
              priority={i === 0}
              className="h-[188px] w-full object-cover object-top"
            />
          </Card>
        )
      })}
    </div>
  )
}
