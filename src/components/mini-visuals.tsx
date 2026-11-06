import type { CSSProperties } from 'react'
import { InView } from './in-view'

/**
 * Small pictures drawn in CSS and hidden from screen readers. Each one says what
 * a service does without a stock image or anyone else's screenshot. They are the
 * finished picture on the server and play once when they scroll into view (see
 * in-view.tsx and the .mv, .mvs and .sc rules in globals.css). Their few
 * words (a customer's message, column names, a task waiting for approval)
 * arrive as `pics`, so this file never imports content.
 */

export type Pics = {
  approve: string
  chatIn: string
  chatOut: string
  chatIn2: string
  cols: string[]
  invoice: string
  stock: string
  task: string
  taskNote: string
  report: string
  book: string
  sensor: string
  reading: string
  alert: string
  ours: string
  us: string
}

/** Three chat bubbles: a customer asks, the shop answers, another customer asks. */
function Chat({ pics }: { pics: Pics }) {
  return (
    <>
      <span className="mvs-b">
        <span className="mv-t">{pics.chatIn}</span>
      </span>
      <span className="mvs-b mvs-b-out">
        <span className="mv-t">{pics.chatOut}</span>
      </span>
      <span className="mvs-b">
        <span className="mv-t">{pics.chatIn2}</span>
      </span>
    </>
  )
}

/** A task the AI prepared, waiting for a person to press Approve. */
function AgentCard({ pics, className, cursor }: { pics: Pics; className: string; cursor?: boolean }) {
  return (
    <div className={className}>
      <div className="mv-agent-head">
        <span className="mv-avatar" />
        <span className="mv-agent-lines">
          <span className="mv-t mv-task">{pics.task}</span>
          <span className="mv-t mv-note">{pics.taskNote}</span>
        </span>
      </div>
      <div className="mv-agent-foot">
        <span className="mv-approve">
          {pics.approve}
          {cursor ? (
            <svg className="mv-cursor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 3l14 8-6.2 1.6L9.6 19 5 3Z" fill="#fff" stroke="#131517" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          ) : null}
        </span>
        <span className="mv-check" />
      </div>
    </div>
  )
}

/** A sensor's reading on one tile, with the alert it raised. */
function SensorTile({ pics, className = '' }: { pics: Pics; className?: string }) {
  return (
    <span className={`mv-tile ${className}`}>
      <span className="mv-t mv-tile-name">{pics.sensor}</span>
      <span className="mv-tile-val">{pics.reading}</span>
      <span className="mv-t mv-tile-alert">{pics.alert}</span>
    </span>
  )
}

const times = (n: number) => Array.from({ length: n }, (_, i) => i)

/** Business systems: a chat turns into an order table, then an invoice and a stock count. */
function SystemsVisual({ pics }: { pics: Pics }) {
  return (
    <InView className="mv mv-lg mv-sys">
      <div className="mvs">
        <div className="mvs-chat">
          <Chat pics={pics} />
        </div>
        <span className="mvs-flow">
          <b />
        </span>
        <div className="mvs-sheet">
          <span className="mvs-head">
            {pics.cols.map((c) => (
              <span key={c} className="mv-t">
                {c}
              </span>
            ))}
          </span>
          {times(5).map((r) => (
            <span key={r} className="mvs-row" style={{ '--r': r } as CSSProperties}>
              <span className="mvs-u" />
              <i />
              <i />
            </span>
          ))}
        </div>
        <div className="mvs-side">
          <span className="mvs-invoice">
            <span className="mv-t">{pics.invoice}</span>
            <i />
            <i />
            <b />
          </span>
          <span className="mvs-stock" data-label={pics.stock}>
            {[70, 46, 88, 22].map((h, i) => (
              <i key={i} style={{ '--h': `${h}%`, '--i': i } as CSSProperties} />
            ))}
          </span>
        </div>
      </div>
    </InView>
  )
}

export function Visual({ id, pics }: { id: string; pics: Pics }) {
  switch (id) {
    case 'systems':
      return <SystemsVisual pics={pics} />
    case 'ai':
      return (
        <InView className="mv mv-lg">
          <AgentCard pics={pics} className="mv-agent" cursor />
        </InView>
      )
    case 'data':
      return (
        <InView className="mv">
          <div className="mv-bars" data-label={pics.report}>
            {[38, 52, 44, 70, 62, 94].map((h, i) => (
              <i key={i} style={{ '--h': `${h}%`, '--i': i } as CSSProperties} />
            ))}
          </div>
        </InView>
      )
    case 'web':
      return (
        <InView className="mv">
          <div className="mv-browser">
            <span className="mv-browser-bar" />
            <span className="mv-browser-hero">
              <span className="mv-t">{pics.book}</span>
            </span>
            <span className="mv-line" />
            <span className="mv-line" />
            <span className="mv-phone">
              <i>
                <b />
                <b />
                <b />
                <b />
              </i>
            </span>
          </div>
        </InView>
      )
    case 'iot':
      return (
        <InView className="mv">
          <SensorTile pics={pics} />
        </InView>
      )
    default:
      return (
        <InView className="mv">
          <div className="mv-blocks">
            <i>
              <span className="mv-t">{pics.ours}</span>
            </i>
            <i>
              <span className="mv-t">{pics.us}</span>
            </i>
          </div>
        </InView>
      )
  }
}

/**
 * The whole range on one picture, for the head of the services page: a chat, an
 * order table, an agent waiting for approval, a report and a website, all in the
 * same drawn language as the cells below it. Sizes are in em with 1em = 1% of the
 * picture's width, so the composition scales as one piece.
 */
export function ServiceCollage({ pics }: { pics: Pics }) {
  return (
    <div className="sc-wrap">
      <InView className="sc">
        <div className="sc-chat">
          <Chat pics={pics} />
        </div>

        <div className="mvs-sheet sc-sheet">
          <span className="mvs-head">
            {pics.cols.map((c) => (
              <span key={c} className="mv-t">
                {c}
              </span>
            ))}
          </span>
          {times(4).map((r) => (
            <span key={r} className="mvs-row" style={{ '--r': r } as CSSProperties}>
              <span className="mvs-u" />
              <i />
              <i />
            </span>
          ))}
        </div>

        <AgentCard pics={pics} className="sc-agent" />

        <div className="mvs-stock sc-report">
          {[38, 52, 44, 70, 62, 94].map((h, i) => (
            <i key={i} style={{ '--h': `${h}%`, '--i': i } as CSSProperties} />
          ))}
        </div>

        <SensorTile pics={pics} className="sc-sensor" />

        <div className="sc-web">
          <span className="sc-web-bar" />
          <span className="sc-web-hero" />
          <span className="sc-web-line" />
          <span className="sc-web-phone">
            <i />
          </span>
        </div>
      </InView>
    </div>
  )
}
