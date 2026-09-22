import type { ContentCopy } from '../types'

export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'I build agent systems, mobile apps and small SaaS products.',
    supporting:
      'You do not need a spec to start. Tell me which part of your work is slow or still done by hand, and I will design it, build it and run it in production.',
    ctaLabel: 'Email me',
    availabilityLabel: 'Available for work',
    spec: [
      { id: 'location', label: 'Based in', value: 'Vietnam · GMT+7' },
      { id: 'languages', label: 'Works in', value: 'English · Tiếng Việt' },
      { id: 'replyTime', label: 'Replies within', value: 'One working day' },
      { id: 'nowBuilding', label: 'Now building', value: 'Reupmatic · PixelBid' },
    ],
  },
  builds: [
    {
      slug: 'reupmatic',
      tagline: 'A desktop app that preps batches of Douyin reuploads on your machine.',
      problem:
        'Reuploading Douyin videos means repeating the same edit, subtitle and voice steps per video.',
      built: 'A queue that downloads, subtitles, translates and voices a batch on your computer.',
      result:
        'Alpha builds are downloadable for macOS and Windows; direct publishing is still in progress.',
    },
    {
      slug: 'ai-engineering-atlas',
      tagline: 'A roadmap for AI engineering that starts at your gap, not from zero.',
      problem:
        'Experienced engineers know AI unevenly, but most roadmaps treat everyone as a beginner.',
      built:
        'A gap-driven curriculum: diagnose first, learn the smallest route, produce evidence.',
      result:
        'Public on GitHub and live at ai-eng.canhta.com; coverage grows, routes get ready.',
    },
    {
      slug: 'copycat-skills',
      tagline: 'Turns an app idea into a decision backed by market evidence.',
      problem: 'Deciding what to build from a product link usually ends in a hunch.',
      built: 'An agent skill that researches the market and recommends a direction.',
      result: 'Published and installable from the public skills registry.',
    },
    {
      slug: 'pixelbid',
      tagline: 'A working rebuild of a bidding game that was trending on X.',
      problem: 'I wanted to understand how the bidding mechanic actually worked.',
      built: 'A credit-backed attention market: a qualified open burns one credit.',
      result: 'In build, as a side project. Original idea: outbid.lol.',
    },
  ],
  capabilities: [
    {
      id: 'agentic',
      name: 'Work that runs itself',
      bestFor: 'Repetitive work that still needs a judgement call.',
      canDeliver: 'An agent that uses your existing tools and asks a person when it is unsure.',
    },
    {
      id: 'mobile',
      name: 'Phone apps',
      bestFor: 'Users who are away from a desk when they need it.',
      canDeliver: 'An app on the App Store and Google Play that works on a weak connection.',
    },
    {
      id: 'web',
      name: 'Web products',
      bestFor: 'The interface your team uses every day.',
      canDeliver: 'A fast, accessible interface that stays easy to change.',
    },
    {
      id: 'saas',
      name: 'Paid products',
      bestFor: 'An idea you want in front of paying users early.',
      canDeliver: 'A small product with sign-in, billing and analytics from the start.',
    },
  ],
  services: [
    {
      id: 'advisory',
      name: 'Solution advisory',
      output: 'A written architecture and a build order you can hand to any developer.',
      suitedTo: 'You know the problem but not how to build the answer.',
    },
    {
      id: 'sprint',
      name: 'Focused build sprint',
      output: 'One working piece of the product, running in production.',
      suitedTo: 'You want to see it work before committing to the whole build.',
    },
    {
      id: 'endToEnd',
      name: 'End-to-end product build',
      output: 'The finished product, released to users and maintained after launch.',
      suitedTo: 'You want one person responsible from the first idea to launch.',
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'How do you price work?',
      answer: 'Fixed scope and fixed price, agreed in writing before any work starts.',
    },
    {
      id: 'ownership',
      question: 'Who owns the code?',
      answer: 'You own the code, the accounts and the infrastructure. Handover is part of the job.',
    },
    {
      id: 'vague',
      question: 'I only have a rough idea. Is that enough?',
      answer: 'Yes. Making it specific is the first thing we do together.',
    },
    {
      id: 'team',
      question: 'Can you work with my existing team?',
      answer: 'Yes. I can build alongside your team, or build it and hand it over to them.',
    },
    {
      id: 'after',
      question: 'What happens after launch?',
      answer: 'I either stay on to run and improve it, or hand it over documented. Your call.',
    },
    {
      id: 'agency',
      question: 'Why you and not an agency?',
      answer: 'You talk to the person writing the code, not to an account manager.',
    },
  ],
}
