export const transcript = [
  { who: 'Maya', color: 'var(--pink)', text: 'Okay, so the beta goes out to 2,000 users on the 14th.' },
  { who: 'Dev', color: 'var(--blue)', text: 'Onboarding still has that empty state bug on iPad, I can fix it by Thursday.' },
  { who: 'Maya', color: 'var(--pink)', text: 'Great. Sam, can you draft the release notes?' },
  { who: 'Sam', color: 'var(--green)', text: 'Yep, I will have a draft in the doc by Wednesday.' },
  { who: 'Dev', color: 'var(--blue)', text: 'And we agreed to push the widgets to 1.1, right?' },
  { who: 'Maya', color: 'var(--pink)', text: 'Right, widgets move to 1.1. Let us lock scope today.' },
]

export const summary = [
  'Beta ships to 2,000 TestFlight users on Oct 14.',
  'Home Screen widgets move from 1.0 to the 1.1 release.',
  'iPad onboarding empty-state bug is the last launch blocker.',
  'Scope for 1.0 is locked as of this meeting.',
]

export const actions = [
  { id: 1, text: 'Fix iPad onboarding empty state', owner: 'Dev', due: 'Thu', done: false },
  { id: 2, text: 'Draft release notes for beta', owner: 'Sam', due: 'Wed', done: false },
  { id: 3, text: 'Send beta invite to 2,000 testers', owner: 'Maya', due: 'Oct 14', done: false },
  { id: 4, text: 'Move widget tickets to 1.1 milestone', owner: 'Dev', due: 'Today', done: true },
]

export const integrations = ['Zoom', 'Google Meet', 'Microsoft Teams', 'FaceTime', 'Slack', 'Notion', 'Linear', 'Salesforce', 'HubSpot', 'Calendar']

export const plans = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    blurb: 'For trying Nimbus on your own calls.',
    features: ['10 meetings / month', 'AI summaries', 'iPhone & Mac apps', '7-day history'],
  },
  {
    name: 'Pro',
    monthly: 14,
    yearly: 10,
    blurb: 'For people who live in meetings.',
    features: ['Unlimited meetings', 'Ask Nimbus across all notes', 'Speaker identification', 'Notion, Slack & Linear sync', 'Unlimited history'],
    featured: true,
  },
  {
    name: 'Team',
    monthly: 24,
    yearly: 18,
    blurb: 'For teams that need one source of truth.',
    features: ['Everything in Pro', 'Shared workspaces', 'Admin & SSO', 'CRM auto-fill', 'Priority support'],
  },
]

export const faqs = [
  {
    q: 'Does Nimbus join my call as a bot?',
    a: 'No. Nimbus listens through your device audio, so nobody sees an extra participant. You can still invite a visible notetaker if your team prefers transparency.',
  },
  {
    q: 'Where is my audio processed?',
    a: 'On Apple silicon, transcription runs entirely on-device. Summaries use encrypted, zero-retention processing, and audio is never used to train models.',
  },
  {
    q: 'Which languages are supported?',
    a: 'Nimbus transcribes 40+ languages and can summarise a meeting in a different language from the one it was spoken in.',
  },
  {
    q: 'Can I cancel any time?',
    a: 'Yes. Plans are month-to-month or yearly, and you can export every note as Markdown or PDF before you leave.',
  },
]
