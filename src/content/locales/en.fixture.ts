import type { ContentCopy } from '../types'

/** Written as one English page, not translated field-by-field from Vietnamese. */
export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'Digitise your work. Let AI do the routine.',
    supporting:
      'For shops and small businesses in Vietnam. Tell us the problem and we find the solution with you. It might be one record for every order, stock item and debt, so nobody retypes.',
    headerCta: 'Call us',
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
        "Enter an order once and the stock and the customer's balance follow. A customer's past orders and what they owe sit on one screen for whoever picks up the phone.",
      examples: ['ERP', 'CRM'],
    },
    {
      id: 'ai',
      name: 'AI agents and chatbots',
      detail:
        'A customer asks about price or stock in chat, and the chatbot answers from your own price list. It can read supplier invoices into the record for a person to check. A person approves anything that costs money or changes an order or record.',
      examples: ['AI agents', 'customer chatbots', 'answers from your own documents'],
    },
    {
      id: 'data',
      name: 'Reports and dashboards',
      detail:
        'Sales, stock and customer figures from your spreadsheets and apps, in one report that stays up to date. On Monday morning you see where you stand without asking anyone.',
      examples: ['Dashboards', 'tidying messy spreadsheets'],
    },
    {
      id: 'web',
      name: 'Websites and apps',
      detail:
        'A website where customers order or book, and the order lands straight in your system. Also web and phone apps for your own idea.',
      examples: [],
    },
    {
      id: 'iot',
      name: 'Connected devices (IoT)',
      detail:
        'Off-the-shelf sensors send temperature and humidity to one screen, and you get an alert when a reading passes your limit. Everyday readings, not certified.',
      examples: [],
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
      question: 'How much will it cost?',
      answer:
        'You see a small working version first, and only then do we give you a clear quote. It comes with a plan, a timeline and how we maintain and support it.',
    },
    {
      id: 'timeline',
      question: 'How long will it take?',
      answer:
        'The small working version comes first, so you see it work early. The plan that comes with the quote gives the timeline, part by part.',
    },
    {
      id: 'apps',
      question: 'Can you connect the apps I already use?',
      answer:
        'We check this while we learn how your work runs today, and tell you which links are possible.',
    },
    {
      id: 'agent',
      question: 'Do I need an AI agent, or is a chatbot enough?',
      answer:
        'A chatbot answers questions. An agent also does steps in your systems, with a person approving. Often a chatbot is enough.',
    },
    {
      id: 'wrong',
      question: 'AI can be wrong. Who checks?',
      answer:
        'A named person, agreed at the start, approves anything that costs money or changes an order or record.',
    },
    {
      id: 'customers',
      question: 'Can AI chat with my customers?',
      answer:
        'Yes, for questions it can answer from the information you gave it. It says it is automated, and it hands over to a person when it is unsure or when the customer asks.',
    },
    {
      id: 'data',
      question: "What happens to my customers' information when AI is used?",
      answer:
        'We collect only what the project needs, and agree up front which AI service receives what and who owns it. We cannot give legal advice.',
    },
    {
      id: 'ownership',
      question: 'Who owns what you build?',
      answer: 'You do. Everything is in your name.',
    },
    {
      id: 'support',
      question: 'What happens after launch?',
      answer:
        'How we maintain and support it is part of the quote, so you know before you commit.',
    },
    {
      id: 'idea',
      question: 'What if I only have an idea?',
      answer:
        'That is fine. Tell us what you want to achieve and who will use it, and we work out together what the small working version needs.',
    },
  ],
}
