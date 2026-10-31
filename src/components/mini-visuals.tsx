import type { CSSProperties } from 'react'
import { InView } from './in-view'

/**
 * Small pictures drawn in CSS and hidden from screen readers. Each one says what
 * a service does without a stock image or anyone else's screenshot. They are the
 * finished picture on the server and play once when they scroll into view (see
 * in-view.tsx and the .mv, .mvs and .sc rules in globals.css). They carry no
 * words except the Approve button, which arrives as a prop so this file never
 * imports content.
 */

const times = (n: number) => Array.from({ length: n }, (_, i) => i)

/** Business systems: a chat turns into an order table, then an invoice and a stock count. */
function SystemsVisual() {
  return (
    <InView className="mv mv-lg mv-sys">
      <div className="mvs">
        <div className="mvs-chat">
          <span className="mvs-b">
            <i />
            <i />
          </span>
          <span className="mvs-b mvs-b-out">
            <i />
            <i />
          </span>
          <span className="mvs-b">
            <i />
            <i />
          </span>
        </div>
        <span className="mvs-flow">
          <b />
        </span>
        <div className="mvs-sheet">
          <span className="mvs-head">
            <i />
            <i />
            <i />
          </span>
          {times(5).map((r) => (
            <span key={r} className="mvs-row" style={{ '--r': r } as CSSProperties}>
              <u />
              <i />
              <i />
            </span>
          ))}
        </div>
        <div className="mvs-side">
          <span className="mvs-invoice">
            <i />
            <i />
            <i />
            <b />
          </span>
          <span className="mvs-stock">
            {[70, 46, 88, 22].map((h, i) => (
              <i key={i} style={{ '--h': `${h}%`, '--i': i } as CSSProperties} />
            ))}
          </span>
        </div>
      </div>
    </InView>
  )
}

export function Visual({ id, approve }: { id: string; approve: string }) {
  switch (id) {
    case 'systems':
      return <SystemsVisual />
    case 'ai':
      return (
        <InView className="mv mv-lg">
          <div className="mv-agent">
            <div className="mv-agent-head">
              <span className="mv-avatar" />
              <span className="mv-agent-lines">
                <span className="mv-line" />
                <span className="mv-line" style={{ width: '62%' }} />
              </span>
            </div>
            <div className="mv-agent-foot">
              <span className="mv-approve">{approve}</span>
              <span className="mv-check" />
            </div>
            <svg className="mv-cursor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 3l14 8-6.2 1.6L9.6 19 5 3Z" fill="#fff" stroke="#131517" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </div>
        </InView>
      )
    case 'data':
      return (
        <InView className="mv">
          <div className="mv-bars">
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
            <span className="mv-browser-hero" />
            <span className="mv-line" />
            <span className="mv-line" />
            <span className="mv-phone">
              <i />
            </span>
          </div>
        </InView>
      )
    case 'iot':
      return (
        <InView className="mv">
          <div className="mv-sensor">
            {[0, 1, 2].map((i) => (
              <span key={i} className="mv-ring" style={{ '--i': i } as CSSProperties} />
            ))}
            <span className="mv-node" />
          </div>
        </InView>
      )
    default:
      return (
        <InView className="mv">
          <div className="mv-blocks">
            <i />
            <i />
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
export function ServiceCollage({ approve }: { approve: string }) {
  return (
    <div className="sc-wrap">
      <InView className="sc">
        <div className="sc-chat">
          <span className="mvs-b">
            <i />
            <i />
          </span>
          <span className="mvs-b mvs-b-out">
            <i />
            <i />
          </span>
          <span className="mvs-b">
            <i />
            <i />
          </span>
        </div>

        <div className="mvs-sheet sc-sheet">
          <span className="mvs-head">
            <i />
            <i />
            <i />
          </span>
          {times(4).map((r) => (
            <span key={r} className="mvs-row" style={{ '--r': r } as CSSProperties}>
              <u />
              <i />
              <i />
            </span>
          ))}
        </div>

        <div className="sc-agent">
          <div className="mv-agent-head">
            <span className="mv-avatar" />
            <span className="mv-agent-lines">
              <span className="mv-line" />
              <span className="mv-line" style={{ width: '62%' }} />
            </span>
          </div>
          <div className="mv-agent-foot">
            <span className="mv-approve">{approve}</span>
            <span className="mv-check" />
          </div>
        </div>

        <div className="mvs-stock sc-report">
          {[38, 52, 44, 70, 62, 94].map((h, i) => (
            <i key={i} style={{ '--h': `${h}%`, '--i': i } as CSSProperties} />
          ))}
        </div>

        <span className="sc-sensor">
          {times(3).map((i) => (
            <span key={i} className="mv-ring" style={{ '--i': i } as CSSProperties} />
          ))}
          <span className="mv-node" />
        </span>

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
