import { Link } from '@/i18n/navigation'
import { getSiteContent } from '@/content'
import type { Locale } from '@/content/types'
import { getMessages } from '@/i18n/messages'
import { firstSentence } from '@/lib/first-sentence'
import { Words } from './words'

/** The three questions a buyer asks before anything else, shown on the home page. */
const FIRST_QUESTIONS = ['pricing', 'wrong', 'ownership']

/**
 * Home: price, who checks the AI and who owns the work, with the first sentence of
 * each answer and a link to the full answers on the services page. Plain text in three columns, so
 * it reads as a short list and not as a row of cards.
 */
export function HomeQuestions({ locale }: { locale: Locale }) {
  const faq = getSiteContent(locale).faq.filter((f) => FIRST_QUESTIONS.includes(f.id))
  if (faq.length === 0) return null
  const copy = getMessages(locale).home

  return (
    <section aria-labelledby="hq-title" className="band sheet ground-white hq">
      <div className="shell">
        <div className="title-band reveal flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <h2 id="hq-title" className="section-title max-w-[16ch]">
            <Words text={copy.questionsHeading} />
          </h2>
          <Link href={{ pathname: '/services', hash: 'answers-title' }} className="hq-more">
            <span className="ul ul-rest">{copy.questionsMore}</span>
          </Link>
        </div>
        <dl className="hq-list reveal mt-10">
          {faq.map((item) => (
            <div key={item.id} className="hq-item">
              <dt className="subtitle">{item.question}</dt>
              <dd className="mt-2 text-[16px] leading-relaxed text-muted">{firstSentence(item.answer)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/**
 * Questions as a short list. The first few, the ones people ask before anything
 * else (price, time, connecting their software), are open; the rest open with a
 * tap. Native `details`, so it works without script, from the keyboard, and the
 * closed answers are still in the page for search and for the FAQ JSON-LD.
 * The heading sits left on a desktop and the answers run down the right.
 */
const OPEN = 3
export function Answers({ locale }: { locale: Locale }) {
  const { faq } = getSiteContent(locale)
  if (faq.length === 0) return null
  const heading = getMessages(locale).services.faqHeading

  return (
    <section aria-labelledby="answers-title" className="band sheet ground-tint">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h2 id="answers-title" className="title-band section-title reveal self-start lg:col-span-4">
          <Words text={heading} />
        </h2>
        <div className="faq-list reveal lg:col-span-8">
          {faq.map((item, i) => (
            <details
              key={item.id}
              id={`faq-${item.id}`}
              open={i < OPEN}
              className="faq-item border-t border-black/15 first:border-t-0"
            >
              <summary className="faq-q subtitle">{item.question}</summary>
              <p className="lead max-w-[52ch] pb-5">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
