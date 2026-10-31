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
        "Enter an order once and stock drops and the customer's balance updates. A customer's past orders and what they owe sit on one screen for whoever picks up the phone.",
      examples: ['ERP', 'CRM'],
    },
    {
      id: 'ai',
      name: 'AI agents and chatbots',
      detail:
        'A customer asks about price or stock in chat, and AI drafts the answer from your own price list. It also reads supplier invoices into the record and flags a total that does not add up.',
      examples: ['AI agents', 'Customer chatbots', 'Answers from your own documents'],
    },
    {
      id: 'data',
      name: 'Reports and dashboards',
      detail:
        'Sales, stock and customer figures from your spreadsheets and apps, in one report that refreshes by itself. On Monday morning you see where you stand without asking anyone.',
      examples: ['Dashboards', 'Tidying messy spreadsheets'],
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
      question: 'How do you price work?',
      answer:
        'A quote comes with the plan, before we build. After the small working version, you decide whether to pay for the next part.',
    },
    {
      id: 'timeline',
      question: 'How long will it take?',
      answer: 'The plan says how long it takes, part by part.',
    },
    {
      id: 'apps',
      question: 'Can you connect the apps I already use?',
      answer:
        'Often yes, such as Excel files, Zalo and sales software. The plan says which links work and which do not.',
    },
    {
      id: 'agent',
      question: 'Do I need an AI agent, or is a chatbot enough?',
      answer:
        'A chatbot answers questions from your price list. An agent also acts in your system, such as creating an order record or updating stock, and often a chatbot is enough.',
    },
    {
      id: 'wrong',
      question: 'AI can be wrong. Who checks?',
      answer:
        'A named person, agreed at the start, approves anything that costs money or changes an order or record. Every step the agent takes is logged.',
    },
    {
      id: 'customers',
      question: 'Can AI chat with my customers?',
      answer:
        'Yes. It says it is automated, answers only from the information you gave it, and hands over to a person when unsure or asked.',
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
      answer: 'You do. Everything is in your name, and we can keep improving it or hand it over with instructions.',
    },
    {
      id: 'idea',
      question: 'What if I only have an idea?',
      answer:
        'That is fine. Tell us what it is and who will use it, and we work out what the first version needs.',
    },
  ],
}
