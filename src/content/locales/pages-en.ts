import type { PagesCopy } from '../pages'

const EMAIL = { label: 'hello@canhta.com', url: 'mailto:hello@canhta.com' }

/** Written as English pages for English readers. The Vietnamese pages are written separately. */
export const enPages: PagesCopy = {
  about: {
    h1: 'About us',
    intro:
      'We help small businesses and individuals move their work into software. Then AI takes the routine steps, and a person approves.',
    sections: [
      {
        id: 'what',
        heading: 'What we do',
        paragraphs: [
          'Many small businesses run on chats, notebooks and spreadsheets. An order arrives on Zalo, gets written in a book, then typed again into Excel. We bring that work into one system, so an order is entered once and stock and balances follow.',
          'Once the system holds the real numbers, AI can help. A chatbot answers customers from your own price list. An AI agent drafts orders or fills in supplier invoices, and the person you choose approves anything that costs money or changes an order.',
          'The range is wide: ERP and CRM, chatbots, websites, web and mobile apps, reports and dashboards, AI agents, connected sensors, and extra hands for a team that is already building a product.',
        ],
        links: [{ label: 'See our services', page: 'services' }],
      },
      {
        id: 'how',
        heading: 'How we work',
        paragraphs: [
          'We start with the problem that costs you the most time or money. We look at the real work together, for example one order from the first message to the delivery, and find where things get typed twice or lost.',
          'Then we build a small working version on your real work. It is free. It shows what we can do and what the change is worth to you.',
          'Only after you have seen that value do we give a clear quote, a plan with a timeline, and how maintenance and support will work. Every project has a signed contract, and the software we build is yours.',
        ],
      },
      {
        id: 'who',
        heading: 'Who we are',
        paragraphs: [
          'Canh Ta is the name we work under, here at canhta.com. We are based in Vietnam and work in Vietnamese and English.',
          'We have worked on products used by hundreds of thousands of people, as developers, in data and in product management.',
        ],
      },
      {
        id: 'products',
        heading: 'Apps we make ourselves',
        paragraphs: [
          'Between projects we build and look after our own apps. They are how we keep our skills sharp, and they let you see the care we put into small details.',
        ],
        items: [
          'Scori keeps score at card and board games, on iPhone and Android.',
          'Remoti turns an iPhone into a remote for Android TV and Google TV.',
          'Piggo follows gold prices from the main gold shops in Vietnam.',
          'AI Engineering Atlas is an open learning route for engineers moving into AI.',
          'copycat-skills helps check the market before building an app.',
        ],
        links: [
          { label: 'Scori', page: 'scori' },
          { label: 'Remoti', page: 'remoti' },
          { label: 'Piggo', page: 'piggo' },
          { label: 'All our products', page: 'products' },
        ],
      },
      {
        id: 'promises',
        heading: 'What you can count on',
        paragraphs: ['These hold for every project, whatever its size.'],
        items: [
          'The small working version is free.',
          'Every project has a signed contract.',
          'The software we build for you is yours.',
          'We tell you what customer information an AI service receives.',
          'We reply within one working day.',
        ],
      },
      {
        id: 'reach',
        heading: 'Where to find us',
        paragraphs: [
          'Write to us by email, or message us on Zalo or WhatsApp. Our public code and notes are on GitHub, X and LinkedIn.',
        ],
        links: [
          EMAIL,
          { label: 'Get advice', page: 'contact' },
          { label: 'GitHub', url: 'https://github.com/canhta' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/canhta' },
        ],
      },
    ],
  },

  privacy: {
    h1: 'Privacy policy',
    intro:
      'What this website collects when you visit or contact us, how Google uses cookies to show ads here, and how to turn that off.',
    updated: 'Last updated 22 November 2026',
    sections: [
      {
        id: 'scope',
        heading: 'Who this covers',
        paragraphs: [
          'This policy covers the website www.canhta.com, run by Canh Ta. In this policy "we" means us, and "you" means anyone who visits the site.',
          'Our apps Scori, Remoti and Piggo each have their own privacy policy on their own website. That policy applies when you use the app.',
        ],
        links: [
          { label: 'Scori privacy policy', url: 'https://scori.canhta.com/privacy/' },
          { label: 'Remoti privacy policy', url: 'https://remoti.canhta.com/privacy/' },
          { label: 'Piggo privacy policy', url: 'https://piggo.canhta.com/en/privacy' },
        ],
      },
      {
        id: 'contact',
        heading: 'When you contact us',
        paragraphs: [
          'The site has no form and no account to sign up for. To reach us you tap a link that opens your email app, Zalo, WhatsApp or a phone call. Nothing reaches us until you send it yourself.',
          'We then receive what you choose to share. That is usually your name, your email address or phone number, and what you tell us about the problem you want to solve.',
          'We use it to reply, to give advice and, if we work together, to run that project. We do not sell it and we do not add you to a mailing list. Zalo, WhatsApp and your email provider carry the message under their own privacy policies.',
        ],
      },
      {
        id: 'visits',
        heading: 'When you visit the site',
        paragraphs: [
          'Vercel hosts the site. Like any web server, it receives your IP address, the address of the page you open, the time and your browser type, so it can send you the page and keep the site safe from abuse.',
          'We count visits with Vercel Web Analytics and check page speed with Vercel Speed Insights. Both work without cookies. They show us totals, such as how many people opened the services page, and do not tell us who you are.',
          'The fonts are stored on our own server, so opening a page does not contact Google Fonts. On its own, the site sets no cookies. The ads described below do.',
        ],
      },
      {
        id: 'ads',
        heading: 'Advertising by Google',
        paragraphs: [
          'This site shows ads served by Google AdSense. Google, not us, chooses which ad you see.',
          'Third-party vendors, including Google, use cookies to serve ads based on your earlier visits to this website or to other websites.',
          "Google's advertising cookies let Google and its partners serve ads to you based on your visits to this site and other sites on the internet. To show and measure ads and to stop fraud, Google may also receive your IP address, details of your device and browser, and how you interact with an ad.",
          'We do not pass Google your name, email address or messages, and we never see the cookies Google sets.',
        ],
        links: [
          { label: 'How Google uses cookies in advertising', url: 'https://policies.google.com/technologies/ads' },
          {
            label: "How Google uses information from sites that use its services",
            url: 'https://policies.google.com/technologies/partner-sites',
          },
        ],
      },
      {
        id: 'opt-out',
        heading: 'How to turn off personalised ads',
        paragraphs: [
          "To stop Google showing you ads based on your interests, turn off personalised ads in Google's Ads Settings.",
          'Many other ad vendors let you opt out in one place at aboutads.info. In Europe, youronlinechoices.eu does the same.',
          'You can also block or delete cookies in your browser settings. You will still see ads, but they will no longer be based on your past visits.',
        ],
        links: [
          { label: 'Google Ads Settings', url: 'https://www.google.com/settings/ads' },
          { label: 'aboutads.info', url: 'https://www.aboutads.info' },
          { label: 'Opt out of other vendors', url: 'https://www.aboutads.info/choices/' },
          { label: 'youronlinechoices.eu', url: 'https://www.youronlinechoices.eu' },
        ],
      },
      {
        id: 'eea',
        heading: 'Visitors in the EEA, UK and Switzerland',
        paragraphs: [
          "If you visit from the European Economic Area, the United Kingdom or Switzerland, a consent message from Google appears before advertising cookies are used. You can accept, refuse, or choose purpose by purpose.",
          'If you refuse, Google may still show ads that are not based on your past visits. You can change your choice at any time from the privacy and cookie settings link on the page.',
        ],
      },
      {
        id: 'keep',
        heading: 'How long we keep things',
        paragraphs: [
          'We keep your messages for as long as we are talking or working together, and for as long as a contract or the law needs us to after that. Visit totals have no names in them.',
        ],
      },
      {
        id: 'rights',
        heading: 'Your choices',
        paragraphs: [
          'You can ask what we hold about you, ask us to correct it, or ask us to delete it. Write to hello@canhta.com and we reply within one working day.',
          'Depending on where you live, the law may give you further rights, such as complaining to the authority that protects personal information in your country.',
        ],
        links: [EMAIL],
      },
      {
        id: 'children',
        heading: 'Children',
        paragraphs: [
          'The site is meant for adults looking for software for their business or their own idea. It is not aimed at children, and we do not knowingly collect information from them.',
        ],
      },
      {
        id: 'changes',
        heading: 'Changes to this policy',
        paragraphs: [
          'When what the site collects changes, for example a new kind of ad or a new way to contact us, we update this page and the date at the top.',
        ],
      },
    ],
  },

  terms: {
    h1: 'Terms of use',
    intro: 'The rules for using this website. Work we do for you is covered by its own signed contract.',
    updated: 'Last updated 22 November 2026',
    sections: [
      {
        id: 'accept',
        heading: 'These terms',
        paragraphs: [
          'These terms cover your use of www.canhta.com, run by Canh Ta. By using the site you accept them. If you do not agree, please do not use the site.',
        ],
      },
      {
        id: 'info',
        heading: 'What the site is for',
        paragraphs: [
          'The site describes our services and some of our own products. It is general information. It is not an offer, a quote, or tax or legal advice.',
          'We give a price only in a written quote, after you have seen a small working version. Work we do together is covered by a signed contract, and where the contract and this site differ, the contract applies.',
        ],
      },
      {
        id: 'ownership',
        heading: 'Who owns the content',
        paragraphs: [
          'The words, pictures and design on this site belong to us. Names and marks of other companies, such as Zalo, Google, Apple or Android, belong to their owners.',
          'You may link to any page and quote a short part with a link back. Please do not copy the site or large parts of it.',
        ],
      },
      {
        id: 'fair-use',
        heading: 'Using the site fairly',
        paragraphs: [
          'Do not try to break into the site, overload it, or use it to send spam or harmful code. Do not copy the site in bulk with automated tools.',
        ],
      },
      {
        id: 'apps',
        heading: 'Our apps',
        paragraphs: [
          'Scori, Remoti and Piggo each have their own website with their own support and privacy pages, and Scori and Piggo publish their own terms. Those apply when you use the app. Purchases made in an app go through Apple or Google.',
        ],
        links: [
          { label: 'Scori terms', url: 'https://scori.canhta.com/terms/' },
          { label: 'Piggo terms', url: 'https://piggo.canhta.com/en/terms' },
          { label: 'Remoti support', url: 'https://remoti.canhta.com/support/' },
        ],
      },
      {
        id: 'links',
        heading: 'Links to other websites',
        paragraphs: [
          'We link to other websites, such as Zalo, WhatsApp, GitHub and the sites of our apps. We do not control them and are not responsible for their content or how they handle your information.',
        ],
      },
      {
        id: 'ads',
        heading: 'Advertising',
        paragraphs: [
          'The site shows ads served by Google. An ad is not a recommendation from us. The privacy policy explains how these ads use cookies and how to turn personalised ads off.',
        ],
        links: [{ label: 'Privacy policy', page: 'privacy' }],
      },
      {
        id: 'warranty',
        heading: 'No guarantee',
        paragraphs: [
          'We work to keep the site accurate and running, but we cannot promise it is always available or free of mistakes. The site is provided as it is.',
          'As far as the law allows, we are not liable for loss that comes from using the site or from relying on what it says. Nothing here limits rights the law gives you that cannot be limited.',
        ],
      },
      {
        id: 'law',
        heading: 'Which law applies',
        paragraphs: ['These terms are governed by the laws of Vietnam.'],
      },
      {
        id: 'changes',
        heading: 'Changes and questions',
        paragraphs: [
          'We may update these terms. The date at the top shows the latest version. Questions go to hello@canhta.com.',
        ],
        links: [EMAIL],
      },
    ],
  },

  apps: {
    scori: {
      h1: 'Scori keeps the score',
      intro: 'One scoreboard for any card or board game. Everyone at the table sees the same score.',
      audience:
        'For friends and families who play cards, board games or party games, and are tired of adding up points on paper. One person keeps the score and everyone else can follow along on their own phone.',
      features: [
        {
          name: 'Any game',
          detail: 'Add players, enter points each round and see who leads. It works for card games, board games and anything else you count.',
        },
        {
          name: 'Works offline',
          detail: 'Games, history and corrections work on one phone without an internet connection.',
        },
        {
          name: 'Join with a QR code',
          detail: 'Friends scan a code or open a link and watch the score on their own phones, in the app or in a browser.',
        },
        {
          name: 'Fix a mistake',
          detail: 'Open the game history, pick the round and correct it. Undo brings back the latest change.',
        },
        {
          name: 'Share the result',
          detail: 'Send the final scores to the group as an image.',
        },
        {
          name: 'Ten languages',
          detail:
            'English, Vietnamese, Simplified and Traditional Chinese, Japanese, Korean, German, French, Spanish and Brazilian Portuguese. It follows your phone language.',
        },
      ],
      platforms: 'iPhone and Android. For ages 13 and over.',
      notes: [
        {
          id: 'privacy',
          heading: 'Your information',
          paragraphs: [
            'Games you play on one phone stay on that phone and need no account. When you share a game, names and scores are stored with Firebase so everyone sees the same board. Signing in with Apple or Google is optional, and you can delete your account in Settings.',
          ],
        },
      ],
      links: [
        { label: 'Scori website', url: 'https://scori.canhta.com/' },
        { label: 'Support', url: 'https://scori.canhta.com/support/' },
        { label: 'Privacy', url: 'https://scori.canhta.com/privacy/' },
        { label: 'Terms', url: 'https://scori.canhta.com/terms/' },
      ],
    },
    remoti: {
      h1: 'Your iPhone as a TV remote',
      intro: 'Remoti controls an Android TV or Google TV from your iPhone, over your home Wi-Fi.',
      audience:
        'For people with an Android TV or Google TV who keep losing the remote, run out of batteries, or would rather type on a phone than pick letters with arrow keys.',
      features: [
        {
          name: 'Four layouts',
          detail: 'Classic Pad, Large Controls, Touch Pad and Hybrid Pad. The keys are the ones you know, and Remoti remembers the layout you pick.',
        },
        {
          name: 'Touch pad',
          detail: 'Swipe and tap to move around the TV menus.',
        },
        {
          name: 'Type from your iPhone',
          detail: 'Type into supported text fields on the TV with your iPhone keyboard, in English or Vietnamese.',
        },
        {
          name: 'Your TVs, saved',
          detail: 'Keep more than one TV and reconnect to the last one you used.',
        },
        {
          name: 'Simple setup',
          detail: 'Put the iPhone and the TV on the same Wi-Fi, choose your TV, then enter the pairing code shown on the screen.',
        },
      ],
      platforms: 'iPhone with iOS 17 or later. Works with Android TV and Google TV.',
      notes: [
        {
          id: 'privacy',
          heading: 'Your information',
          paragraphs: [
            'Saved TVs and pairing stay on your iPhone. Text you type goes only to the TV you paired, and Remoti does not store it.',
          ],
        },
      ],
      links: [
        { label: 'Remoti website', url: 'https://remoti.canhta.com/' },
        { label: 'Support', url: 'https://remoti.canhta.com/support/' },
        { label: 'Privacy', url: 'https://remoti.canhta.com/privacy/' },
      ],
    },
    piggo: {
      h1: 'Piggo follows gold prices',
      intro:
        'Gold prices from the main gold shops in Vietnam in one place, with charts, calculators and a list of what you hold.',
      audience:
        'For people in Vietnam who buy gold or keep savings, and want to check the price before they go to the shop or the bank.',
      features: [
        {
          name: 'Prices today',
          detail:
            'Buy and sell prices for SJC bars, 9999 rings, 18K and 24K gold from 13 brands, including SJC, DOJI, PNJ and Bảo Tín Minh Châu, each with the time it was posted.',
        },
        {
          name: 'Charts and comparison',
          detail: 'See how a price has moved and compare brands side by side.',
        },
        {
          name: 'World gold and rates',
          detail: 'The world gold price, exchange rates and bank savings rates, next to the local prices.',
        },
        {
          name: 'Calculators',
          detail: 'Work out the profit or loss on gold you hold, convert between gold units, and calculate interest on savings.',
        },
        {
          name: 'Price alerts',
          detail: 'Get a notification when a price reaches the level you set. No account needed.',
        },
        {
          name: 'What you hold',
          detail:
            'Keep a list of your gold and savings. Sign in with Google or Apple to sync it, export it as a CSV file, and lock the app with your face or fingerprint.',
        },
      ],
      platforms: 'A website at piggo.canhta.com, in Vietnamese and English, and an app for iPhone and Android.',
      notes: [
        {
          id: 'privacy',
          heading: 'Your information',
          paragraphs: [
            'Prices, charts, watch lists and settings stay on your device. Piggo does not collect your phone number, name or email. Signing in is only needed to sync the list of what you hold, and you can export or delete it at any time.',
          ],
        },
      ],
      links: [
        { label: 'Piggo website', url: 'https://piggo.canhta.com/en/gold-price-today' },
        { label: 'Privacy', url: 'https://piggo.canhta.com/en/privacy' },
        { label: 'Terms', url: 'https://piggo.canhta.com/en/terms' },
      ],
    },
  },
}
