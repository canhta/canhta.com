import type { ContentCopy } from '../types'

/** Written as one English page, not translated field-by-field from Vietnamese. */
export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'Enter each order once.',
    supporting:
      'Orders, stock and debts get one record, so nobody retypes them. Then AI reads messages and invoices and fills in the record for a person to approve.',
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
      detail:
        "One record for each order, customer, stock item and debt, so nobody retypes. Enter an order once and stock drops and the customer's balance updates.",
      examples: ['ERP', 'CRM', 'orders and stock', 'who owes what'],
    },
    {
      id: 'ai',
      name: 'AI agents and chatbots',
      detail:
        'AI reads an incoming order message or invoice, fills in the record and drafts the reply. A person approves anything that costs money or changes a record, and every step is logged.',
      examples: ['Customer chatbots', 'reading orders and invoices', 'weekly reports'],
    },
    {
      id: 'data',
      name: 'Reports and dashboards',
      detail:
        'Sales, stock and customer figures from your spreadsheets and apps, in one report that refreshes by itself. On Monday morning you see where you stand without asking anyone.',
      examples: ['Dashboards', 'weekly reports', 'tidying messy spreadsheets'],
    },
    {
      id: 'web',
      name: 'Websites and apps',
      detail:
        'A website where customers order or book, and the order lands straight in your system. Also web and phone apps for your own idea.',
      examples: ['Websites', 'web apps', 'iPhone and Android apps'],
    },
    {
      id: 'iot',
      name: 'Connected devices (IoT)',
      detail:
        'Off-the-shelf sensors send temperature and humidity to one screen, and you get an alert when a reading passes your limit. Everyday readings, not certified.',
      examples: ['Temperature and humidity', 'dashboard', 'alerts'],
    },
    {
      id: 'team',
      name: 'Extra hands for your team',
      detail:
        'We join your team for a while, or take one piece, such as a phone app or a link between two systems. We work on the systems you already use and follow how your team works.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'How do you price work?',
      answer:
        'You get a plan and a quote before we build anything. The small working version is priced first, and we agree the next part only when it works.',
    },
    {
      id: 'timeline',
      question: 'How long will it take?',
      answer: 'The plan says how long the small working version takes. Each next part gets its own estimate before we start it.',
    },
    {
      id: 'existing',
      question: 'Do we really need custom software?',
      answer: 'Often not. If ready-made software does the job we will say so, and build only what it cannot do.',
    },
    {
      id: 'agent',
      question: 'Do I need an AI agent, or is a chatbot enough?',
      answer:
        'A chatbot answers questions from your price list. An agent also reads an order, checks stock and drafts the reply, and often a chatbot is enough.',
    },
    {
      id: 'wrong',
      question: 'AI can be wrong. Who checks?',
      answer:
        'A named person, agreed at the start, approves anything that costs money or changes an order or record. The agent flags what looks off, such as an invoice total that does not add up, and logs every step.',
    },
    {
      id: 'customers',
      question: 'Can AI chat with my customers?',
      answer:
        'Yes. It says it is automated, answers only from the information you gave it, and hands over to a person when unsure or asked.',
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
