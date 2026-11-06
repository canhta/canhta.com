import type { CSSProperties } from 'react'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'

/**
 * The home hero's picture, the whole offer in one view. On the left, work as it
 * lives today for a shop, a small business or one person with an idea: Zalo
 * chats, spreadsheets, a notebook, an app idea. They flow into one system
 * (digitise first). Over it, the AI assistant has prepared tasks from three
 * different kinds of business, each waiting for a person to approve.
 *
 * Plain HTML and CSS with depth, no script. It plays once on arrival
 * (transform only, see `.flow` in globals.css) and then rests; with reduced
 * motion it is simply the finished picture.
 */
export function HeroVisual({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const v = messages.hero.visual

  return (
    <div className="flow" role="img" aria-label={v.label}>
      <div className="flow-stage" aria-hidden="true">
        <ul className="flow-sources">
          {v.sources.map((source, i) => (
            <li key={source} className="flow-source" style={{ '--i': i } as CSSProperties}>
              <span className="flow-line" />
              {source}
            </li>
          ))}
        </ul>

        <div className="flow-system">
          <p className="flow-system-title">
            <span className="flow-dot" />
            {v.system}
          </p>
          <ul className="flow-modules">
            {v.modules.map((m) => (
              <li key={m}>
                <span className="flow-tick" />
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="flow-ai">
          <p className="flow-ai-head">
            <span>{v.ai}</span>
            <small>{v.aiCount}</small>
          </p>
          <ul>
            {v.tasks.map((task, i) => (
              <li key={task} className="flow-task" style={{ '--i': i } as CSSProperties}>
                <span className="flow-task-text">{task}</span>
                <span className={i === 0 ? 'flow-approve flow-approve-done' : 'flow-approve'}>
                  {messages.home.approve}
                  {i === 0 ? (
                    <svg className="flow-cursor" viewBox="0 0 24 24">
                      <path d="M5 3l14 8-6.2 1.6L9.6 19 5 3Z" fill="#fff" stroke="#131517" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
