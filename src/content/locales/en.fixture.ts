import type { ContentCopy } from '../types'

/** Written as one English page, not translated field-by-field from Vietnamese. */
export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'We digitise how you work, then let AI agents do the routine part.',
    supporting:
      'ERP, CRM, chatbots, websites, data, IoT and AI agents for small businesses and individuals. We start from how you work today and move it over step by step.',
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
      summary: 'Take a short test to see what you are missing, then get the shortest route to a hands-on project.',
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
        'ERP, CRM, orders, stock and internal systems that replace chat threads and spreadsheets.',
      examples: ['ERP', 'CRM', 'Orders and stock', 'Internal systems'],
    },
    {
      id: 'ai',
      name: 'AI agents and chatbots',
      detail:
        'AI that reads, answers and does the routine steps inside your systems. A person approves what matters.',
      examples: ['Customer chatbots', 'Order and document reading', 'Automated workflows'],
    },
    {
      id: 'data',
      name: 'Data and reports',
      detail:
        'Gather scattered data, clean it up, and turn it into reports you can act on.',
      examples: ['Dashboards', 'Reports', 'Data clean-up'],
    },
    {
      id: 'web',
      name: 'Websites and apps',
      detail:
        'Websites, web apps and phone apps, for your business or for your own idea.',
      examples: ['Websites', 'Web apps', 'iPhone and Android apps'],
    },
    {
      id: 'iot',
      name: 'Connected devices (IoT)',
      detail:
        'Connect sensors and devices to your system so you can watch and control them in one place.',
      examples: ['Sensors', 'Device monitoring', 'Alerts'],
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
      id: 'ownership',
      question: 'Who owns what you build?',
      answer: 'You do. The code, the accounts and the systems are all in your name.',
    },
    {
      id: 'existing',
      question: 'Do we really need custom software?',
      answer:
        'Often not. If software you can already buy does the job, we will tell you, so you do not spend money for nothing.',
    },
    {
      id: 'idea',
      question: 'What if I only have an idea?',
      answer:
        'That is fine. Tell us what you want to make and who it is for. We will help you start with the smallest useful version.',
    },
    {
      id: 'team',
      question: 'Can you work with my team?',
      answer: 'Yes. We work alongside your team, or take one piece of the work and hand it over.',
    },
    {
      id: 'after',
      question: 'What happens when it is finished?',
      answer:
        'We can keep fixing and improving it, or hand it over with clear instructions so you can run it yourself.',
    },
  ],
}
