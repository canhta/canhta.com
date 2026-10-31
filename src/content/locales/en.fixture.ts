import type { ContentCopy } from '../types'

/** Written as one English page, not translated field-by-field from Vietnamese. */
export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'We digitise how you work, then let AI agents do the routine part.',
    supporting:
      'If orders are typed by hand, chats wait for an answer and stock lives in a spreadsheet, we bring it into one system. AI then does the routine steps and a person approves what matters.',
    headerCta: 'Talk to us',
    availabilityLabel: 'Taking on new projects',
  },
  builds: [
    {
      slug: 'scori',
      tagline: 'Keep score at card games and board games.',
      summary:
        'Add the players, enter points, see who is ahead. Works without internet. Friends follow the scores by scanning a QR code.',
      availability: 'Not in the app stores yet. iPhone and Android, 10 languages.',
    },
    {
      slug: 'remoti',
      tagline: 'Use your iPhone as a remote for Android TV and Google TV.',
      summary:
        'Buttons, a touch pad and typing from your iPhone keyboard. Also being built: sending photos and video, mirroring your screen, and showing PDF slides on the TV.',
      availability: 'Not released yet. iPhone only.',
    },
    {
      slug: 'ai-engineering-atlas',
      tagline: 'A learning roadmap for software engineers moving into AI.',
      summary: 'Take a short test to see what you are missing, then follow a route that fills the gaps.',
      availability: 'Open source, in English and Vietnamese.',
    },
    {
      slug: 'copycat-skills',
      tagline: 'Check the market before you decide to build an app.',
      summary:
        'A tool for AI coding assistants. It finds competitors and demand, then suggests whether to build, stop or change direction.',
      availability: 'Install from skills.sh. Source on GitHub.',
    },
  ],
  offers: [
    {
      id: 'systems',
      name: 'Business systems',
      detail:
        'ERP, CRM and internal systems for orders, stock, who owes what and reports, in place of chat threads and spreadsheets.',
      examples: ['ERP', 'CRM', 'orders and stock', 'who owes what'],
    },
    {
      id: 'ai',
      name: 'AI agents and chatbots',
      detail:
        'Typical first jobs: reading orders and invoices into your system, drafting replies for your staff to approve, answering from your own documents, and a weekly report. A person approves anything that costs money or goes to a customer.',
      examples: ['Customer chatbots', 'reading orders and invoices', 'weekly reports'],
    },
    {
      id: 'data',
      name: 'Data and reports',
      detail:
        'Pull sales, stock and customer figures out of your spreadsheets and apps into one place, then turn them into a report you can act on.',
      examples: ['Dashboards', 'weekly reports', 'tidying messy spreadsheets'],
    },
    {
      id: 'web',
      name: 'Websites and apps',
      detail:
        'Websites, web apps and phone apps, for your business or for your own idea.',
      examples: ['Websites', 'web apps', 'iPhone and Android apps'],
    },
    {
      id: 'iot',
      name: 'Connected devices (IoT)',
      detail:
        'A dashboard and alerts on sensors and devices you can buy off the shelf, such as temperature and humidity. You see the readings in one place and get a message when something is off. These are everyday readings, not certified measurements.',
      examples: ['Temperature and humidity', 'dashboard', 'alerts'],
    },
    {
      id: 'team',
      name: 'Extra hands for your team',
      detail:
        'We work alongside your developers, or take on one piece of the work, on the systems you already use.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'How do you price work?',
      answer:
        'We send a plan and a price before we build anything. The project starts with a small working version. If it works well, we continue.',
    },
    {
      id: 'existing',
      question: 'Do we really need custom software?',
      answer:
        'Often not. We pick the smallest fix first. If software you can already buy does the job, we will tell you, so you do not spend money for nothing.',
    },
    {
      id: 'agent',
      question: 'Do I need an AI agent, or is a chatbot enough?',
      answer:
        'A chatbot answers messages. An AI agent does steps in your systems, like reading an order and filling in the record. Often a chatbot or a simple fixed rule is enough, and then that is what we build.',
    },
    {
      id: 'wrong',
      question: 'AI can be wrong. Who checks?',
      answer:
        'A named person approves anything that costs money or goes to a customer, before it happens. Usually that is you or someone on your team. We agree who at the start.',
    },
    {
      id: 'customers',
      question: 'Can AI chat with my customers?',
      answer:
        'Yes. It tells customers it is an automated assistant, answers from the information you gave it, and hands over to a person when it is unsure or the customer asks for one.',
    },
    {
      id: 'data',
      question: 'What happens to my customers\' data when AI is used?',
      answer:
        'We collect only what the project needs. Before we start, we tell you what an AI service would receive and from which provider, and we agree who owns the data. We cannot give legal advice.',
    },
    {
      id: 'ownership',
      question: 'Who owns what you build?',
      answer:
        'You do. The code, the accounts and the systems are all in your name. When it is finished we can keep fixing and improving it, or hand it over with clear instructions so you can run it yourself.',
    },
    {
      id: 'idea',
      question: 'What if I only have an idea?',
      answer:
        'That is fine. Tell us what you want to make and who it is for. We will help you start with the smallest useful version.',
    },
  ],
}
