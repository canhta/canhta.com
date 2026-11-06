import type { ContentCopy } from '../types'

/** Written as one English page, not translated field-by-field from Vietnamese. */
export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'Chats, spreadsheets and paperwork in one system.',
    supporting:
      'We build business software, websites, apps and AI agents for small businesses and individuals in Vietnam. AI takes steps like logging orders, chasing payments and answering customers, and someone on your side approves before anything goes out.',
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
        "Enter an order once and the stock and the customer's balance update with it. Whoever answers the phone sees what that customer has bought and what they still owe.",
      examples: ['ERP', 'CRM'],
    },
    {
      id: 'ai',
      name: 'AI agents and chatbots',
      detail:
        'A customer asks about price or stock in chat, and the chatbot answers from your own price list. AI can also read supplier invoices and fill them in for someone on your side to check. Anything that touches money, or changes an order or your books, waits for a person to approve it.',
      examples: ['AI agents', 'customer chatbots', 'answers from your own documents'],
    },
    {
      id: 'data',
      name: 'Reports and dashboards',
      detail:
        'Sales, stock and customer numbers from your spreadsheets and apps, pulled into one report that stays up to date. On Monday morning you know where you stand without asking around.',
      examples: ['Dashboards', 'tidying messy spreadsheets'],
    },
    {
      id: 'web',
      name: 'Websites and apps',
      detail:
        'A website where customers order or book, with each order going straight into your system. If you have an idea of your own, we build the web or phone app for it.',
      examples: [],
    },
    {
      id: 'iot',
      name: 'Connected devices (IoT)',
      detail:
        'Off-the-shelf sensors send temperature and humidity to one screen, and you get an alert when a reading crosses your limit. The readings are for day-to-day checks. They are not certified measurements.',
      examples: [],
    },
    {
      id: 'team',
      name: 'Extra hands for your team',
      detail:
        'We join your team for a while, or take on one piece of the work, such as a phone app or a connection between two systems. We use the systems you already have and fit the way your team works.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'How much will it cost?',
      answer:
        'You see a small working version first. Once you have seen it do the job, we send a clear quote with a plan, a timeline and how we maintain and support it.',
    },
    {
      id: 'timeline',
      question: 'How long will it take?',
      answer:
        'The small working version comes first, so you see results early. The plan that comes with the quote sets out the time for each part after that.',
    },
    {
      id: 'apps',
      question: 'Can you connect the apps I already use?',
      answer:
        'We check this while we look into the problem, and tell you which ones we can connect.',
    },
    {
      id: 'agent',
      question: 'Do I need an AI agent, or is a chatbot enough?',
      answer:
        'A chatbot answers questions. An agent can also carry out steps in your systems, with a person approving. Often a chatbot is all you need.',
    },
    {
      id: 'wrong',
      question: 'AI can be wrong. Who checks?',
      answer:
        'At the start we agree on one person who approves. Anything that touches money, or changes an order or your books, goes through them.',
    },
    {
      id: 'customers',
      question: 'Can AI chat with my customers?',
      answer:
        'Yes, when the answer is in the information you gave it. It tells customers it is automated, and it passes the chat to a person when it is unsure or when the customer asks.',
    },
    {
      id: 'data',
      question: "What happens to my customers' information when AI is used?",
      answer:
        'We take only what the project needs. Before we start, we agree which AI service gets which information and who owns it. This is not legal advice.',
    },
    {
      id: 'ownership',
      question: 'Who owns what you build?',
      answer: 'You do. Everything is in your name.',
    },
    {
      id: 'support',
      question: 'What happens once it is running?',
      answer:
        'How we maintain and support it is written into the quote, so you know before you decide.',
    },
    {
      id: 'idea',
      question: 'What if I only have an idea?',
      answer:
        'That is fine. Tell us what you want to achieve and who will use it, and we will work out together what the small working version needs.',
    },
  ],
}
