import type { ContentCopy } from '../types'

/** Written as one English page, not translated field-by-field from Vietnamese. */
export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'Digital transformation and AI for small businesses',
    supporting:
      'Chats, spreadsheets and paperwork in one system. AI enters orders and answers customers, and you approve.',
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
        'Enter an order once and stock and balances update. Whoever answers the phone sees what the customer bought and owes.',
      examples: ['ERP', 'CRM'],
    },
    {
      id: 'ai',
      name: 'AI agents and chatbots',
      detail:
        'A chatbot answers customers from your price list. AI fills in supplier invoices for your team to approve.',
      examples: ['AI agents', 'customer chatbots', 'answers from your own documents'],
    },
    {
      id: 'data',
      name: 'Reports and dashboards',
      detail:
        'Sales, stock and customer numbers in one report. On Monday morning you know where you stand.',
      examples: ['Dashboards', 'tidying messy spreadsheets'],
    },
    {
      id: 'web',
      name: 'Websites and apps',
      detail:
        'A website where customers order or book, straight into your system. Got your own idea? We build the app.',
      examples: [],
    },
    {
      id: 'iot',
      name: 'Connected devices (IoT)',
      detail:
        'Off-the-shelf sensors send temperature and humidity to one screen and alert you past your limit. For monitoring, not certified measurement.',
      examples: [],
    },
    {
      id: 'team',
      name: 'Extra hands for your team',
      detail:
        'Your team is building a product and needs more people? We join in, or take one piece such as the phone app.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'How much will it cost?',
      answer:
        'It depends on the work, so we quote once you have seen the working version. The working version is free.',
    },
    {
      id: 'timeline',
      question: 'How long will it take?',
      answer:
        'The working version comes first. The plan gives the time for each later part before you sign.',
    },
    {
      id: 'apps',
      question: 'Can you connect the apps I already use?',
      answer:
        'We check what can connect while we look into the problem.',
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
        'You pick one approver at the start. Anything touching money, orders or your books goes through them.',
    },
    {
      id: 'customers',
      question: 'Can AI chat with my customers?',
      answer:
        'Yes, when the answer is in what you gave it. It says it is automated and hands over to a person when unsure.',
    },
    {
      id: 'data',
      question: "What happens to my customers' information when AI is used?",
      answer:
        'We take only what the project needs and agree up front which AI gets what.',
    },
    {
      id: 'ownership',
      question: 'Who owns what you build?',
      answer: 'You do, and the contract says so.',
    },
    {
      id: 'support',
      question: 'What happens once it is running?',
      answer:
        'Maintenance and support are written into the quote.',
    },
    {
      id: 'idea',
      question: 'What if I only have an idea?',
      answer:
        'That works. Tell us the goal and who will use it, and we plan the working version together.',
    },
  ],
}
