import type { ContentCopy } from '../types'

/** Written as one English page, not translated field-by-field from Vietnamese. */
export const enContent: ContentCopy = {
  profile: {
    location: 'Vietnam',
    hook: 'Fix what keeps slowing your business down.',
    supporting:
      'I map the workflow with you before choosing the answer. We may keep your tools, connect them, build custom software, or apply AI. You get a plan and quote before I write code.',
    ctaLabel: "Tell me what's stuck",
    availabilityLabel: 'Taking on new projects',
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
      tagline: 'A desktop app that processes Douyin videos in batches on your machine.',
      problem: 'Each video repeats the same download, edit, subtitle, and voice steps.',
      built: 'A local queue that runs those steps across a full batch.',
      result: 'Alpha builds run on macOS and Windows. I am adding direct publishing next.',
    },
    {
      slug: 'ai-engineering-atlas',
      tagline: 'An AI engineering roadmap that starts with what the learner is missing.',
      problem: 'Working developers know AI unevenly, while most roadmaps restart from zero.',
      built: 'A diagnostic that finds the gaps and creates the shortest route to a practical project.',
      result: 'The source code is public, and the website is live. I continue to expand the material.',
    },
    {
      slug: 'copycat-skills',
      tagline: 'Check the market before deciding whether to build the app.',
      problem: 'One product link is not enough evidence for a market decision.',
      built: 'An agent skill that finds competitors, demand signals, and reasons to build, stop, or change direction.',
      result: 'You can install it from skills.sh and inspect the source on GitHub.',
    },
    {
      slug: 'pixelbid',
      tagline: 'A working rebuild of a bidding game that gained traction on X.',
      problem: 'I wanted to understand the auction mechanic instead of guessing from the interface.',
      built: 'A credit-backed attention market: a qualified open burns one credit.',
      result: 'I am building it as a side project. The original idea came from outbid.lol.',
    },
  ],
  capabilities: [
    {
      id: 'agentic',
      name: 'AI for repetitive desk work',
      bestFor: 'Your team reads, sorts, summarizes, or answers the same type of information each day.',
      canDeliver: 'AI handles repeated steps inside your current systems. A person approves high-stakes decisions.',
    },
    {
      id: 'mobile',
      name: 'Move field work into one system',
      bestFor: 'Staff receive jobs, record work, or report progress through paper, chat, and spreadsheets.',
      canDeliver: 'A mobile app built around the workflow that still works on a weak connection.',
    },
    {
      id: 'web',
      name: 'Connect a fragmented workflow',
      bestFor: 'Data gets copied between files, chat threads, or systems that do not share it.',
      canDeliver: 'Internal software that connects the steps, cuts re-entry, and shows where each job stands.',
    },
    {
      id: 'saas',
      name: 'Test a new digital product',
      bestFor: 'You have a new service or revenue idea but do not yet know whether customers will use it.',
      canDeliver: 'A small SaaS product that customers can use and pay for before you expand it.',
    },
  ],
  services: [
    {
      id: 'advisory',
      name: 'Find the bottleneck',
      output: 'The current workflow, solution options, the smallest useful scope, a plan, and a quote.',
      suitedTo: 'Work is slow, but you do not yet know whether the process or the software is at fault.',
    },
    {
      id: 'sprint',
      name: 'Put one workflow into use',
      output: 'One important workflow running with your team and real data.',
      suitedTo: 'You want evidence from daily use before expanding the system.',
    },
    {
      id: 'endToEnd',
      name: 'Build the full system',
      output: 'Software in operation, with documentation, handover, and a maintenance plan.',
      suitedTo: 'You want one person responsible from workflow mapping through stable operation.',
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'How do you price work?',
      answer: 'I map the workflow and agree on the scope first. You get the plan, delivery points, and quote before I write code.',
    },
    {
      id: 'ownership',
      question: 'Who owns the code?',
      answer: 'You own the code, accounts, and infrastructure. Handover is part of the job.',
    },
    {
      id: 'vague',
      question: 'What if I do not know whether I need software, automation, or AI?',
      answer: 'That is fine. I start with the people, steps, and result involved. I choose the technology afterward. Sometimes the right answer requires no custom code.',
    },
    {
      id: 'team',
      question: 'Can you work with my existing team?',
      answer: 'Yes. I can work alongside your team or build the system and hand it over.',
    },
    {
      id: 'after',
      question: 'What happens after launch?',
      answer: 'I can continue to run and improve it, or hand it over with documentation.',
    },
    {
      id: 'agency',
      question: 'When does custom software make sense?',
      answer: 'Build it when existing tools force workarounds or duplicate entry. It also fits when off-the-shelf software cannot follow a core process. If an existing tool fits, use it.',
    },
  ],
}
