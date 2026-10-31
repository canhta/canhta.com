import type { ContentCopy } from '../types'

/** Written as one English page, not translated field-by-field from Vietnamese. */
export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'Digitise your work. Let AI do the routine.',
    supporting: 'For shops and small businesses. Orders and stock in one system, then AI for the routine steps.',
    headerCta: 'Talk to us',
    availabilityLabel: 'Taking on new projects',
  },
  builds: [
    {
      slug: 'scori',
      tagline: 'Keep score at card and board games.',
      summary: 'Add players, enter points, see who leads. Works offline. Friends follow along with a QR code.',
      availability: 'iPhone and Android, 10 languages.',
    },
    {
      slug: 'remoti',
      tagline: 'Your iPhone as a remote for Android TV and Google TV.',
      summary: 'Buttons, a touch pad and typing from your iPhone keyboard.',
      availability: 'iPhone only.',
    },
    {
      slug: 'ai-engineering-atlas',
      tagline: 'A learning roadmap for engineers moving into AI.',
      summary: 'Take a short test, then follow a route that fills the gaps.',
      availability: 'Open source, in English and Vietnamese.',
    },
    {
      slug: 'copycat-skills',
      tagline: 'Check the market before you build an app.',
      summary:
        'An add-on for AI coding assistants. It looks up competitors and demand, then suggests whether to build, stop or change direction.',
      availability: 'Source code on GitHub.',
    },
  ],
  offers: [
    {
      id: 'systems',
      name: 'Business systems',
      detail: 'ERP and CRM for orders, stock, who owes what and reports.',
      examples: ['ERP', 'CRM', 'orders and stock', 'who owes what'],
    },
    {
      id: 'ai',
      name: 'AI agents and chatbots',
      detail: 'AI that reads orders and invoices, drafts replies for your staff and answers from your own documents.',
      examples: ['Customer chatbots', 'reading orders and invoices', 'weekly reports'],
    },
    {
      id: 'data',
      name: 'Reports and dashboards',
      detail: 'Sales, stock and customer figures from your spreadsheets and apps, in one report.',
      examples: ['Dashboards', 'weekly reports', 'tidying messy spreadsheets'],
    },
    {
      id: 'web',
      name: 'Websites and apps',
      detail: 'Websites, web apps and phone apps, for your business or your own idea.',
      examples: ['Websites', 'web apps', 'iPhone and Android apps'],
    },
    {
      id: 'iot',
      name: 'Connected devices (IoT)',
      detail:
        'A dashboard and alerts for off-the-shelf sensors, such as temperature and humidity (everyday readings, not certified).',
      examples: ['Temperature and humidity', 'dashboard', 'alerts'],
    },
    {
      id: 'team',
      name: 'Extra hands for your team',
      detail: 'We join your team or take one piece of the work, on the systems you already use.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'How do you price work?',
      answer:
        'You get a plan and a price before we build. We start with a small working version and go on only if it works.',
    },
    {
      id: 'timeline',
      question: 'How long will it take?',
      answer: 'The plan says how long the first small version takes.',
    },
    {
      id: 'existing',
      question: 'Do we really need custom software?',
      answer: 'Often not. If software you can buy does the job, we will say so.',
    },
    {
      id: 'agent',
      question: 'Do I need an AI agent, or is a chatbot enough?',
      answer:
        'A chatbot answers messages. An agent also does steps in your systems, and often a chatbot is enough.',
    },
    {
      id: 'wrong',
      question: 'AI can be wrong. Who checks?',
      answer:
        'A named person, agreed at the start, approves anything that costs money or changes an order or record. A customer chatbot only answers from the information you gave it.',
    },
    {
      id: 'customers',
      question: 'Can AI chat with my customers?',
      answer: 'Yes. It says it is automated and hands over to a person when unsure or asked.',
    },
    {
      id: 'data',
      question: 'What happens to my customers\' information when AI is used?',
      answer:
        'We collect only what the project needs, and agree up front which AI service receives what and who owns it. We cannot give legal advice.',
    },
    {
      id: 'ownership',
      question: 'Who owns what you build?',
      answer: 'You do. Everything is in your name, and we can keep improving it or hand it over with instructions.',
    },
    {
      id: 'idea',
      question: 'What if I only have an idea?',
      answer: 'That is fine. Tell us what it is and who it is for, and we start with the smallest useful version.',
    },
  ],
}
