// data.js - static sample data for the app.
// Includes course listings, match profiles, webinar groups, and conversation history.
export const courseList = [
  { id:1, title:'Accounting 101',                   level:'Expert',       price:0,   uni:'AdDU',        rating:4.8, reviews:23, desc:'Learn Accounting 101 from an expert level tutor. Perfect for students who want to master this subject.' },
  { id:2, title:'Business Management',              level:'Advanced',     price:257, uni:'UM',          rating:4.7, reviews:42, desc:'Learn Business Management from an advanced level tutor. Perfect for students who want to master this subject.' },
  { id:3, title:'CC103 – Intermediate Programming', level:'Advanced',     price:0,   uni:'UM',          rating:4.9, reviews:18, desc:'Learn CC103 – Intermediate Programming from an advanced level tutor. Perfect for students who want to master this subject.' },
  { id:4, title:'Calculus Made Easy',               level:'Beginner',     price:0,   uni:'UP Mindanao', rating:4.6, reviews:35, desc:'Simplify calculus with step-by-step walkthroughs designed for first-year students.' },
  { id:5, title:'Digital Marketing Basics',         level:'Beginner',     price:150, uni:'AdDU',        rating:4.5, reviews:27, desc:'Understand social media strategy, SEO, and content creation for your brand or business.' },
  { id:6, title:'Data Structures & Algorithms',     level:'Intermediate', price:0,   uni:'UM',          rating:4.8, reviews:31, desc:'Master sorting algorithms, linked lists, trees, and graphs through practical examples.' },
  { id:7, title:'Public Speaking & Communication',  level:'Beginner',     price:0,   uni:'Holy Cross',  rating:4.4, reviews:19, desc:'Build confidence and structure your ideas for presentations, debates, and everyday speaking.' },
  { id:8, title:'Filipino Literature',              level:'Beginner',     price:0,   uni:'UP Mindanao', rating:4.3, reviews:14, desc:'Explore classic and contemporary Filipino literary works with guided discussion and analysis.' },
  { id:9, title:'Web Development Bootcamp',         level:'Intermediate', price:500, uni:'UM',          rating:4.9, reviews:56, desc:'Build modern websites from scratch using HTML, CSS, JavaScript, and React.' },
];

export const matchList = [
  { name:'Maria Santos', uni:'AdDU',        teaches:['Accounting','Finance'],    wants:['Python','Web Dev'],       color:'#2563EB' },
  { name:'Kevin Reyes',  uni:'UM',          teaches:['Python','Data Sci'],       wants:['Accounting','Marketing'], color:'#7C3AED' },
  { name:'Aileen Cruz',  uni:'UP Mindanao', teaches:['Calculus','Statistics'],   wants:['React','UI Design'],      color:'#059669' },
  { name:'Paolo Vidal',  uni:'Holy Cross',  teaches:['Marketing','Comm'],        wants:['Programming','DSA'],      color:'#D97706' },
];

export const webinarsByTab = {
  upcoming: [
    { title:'Finals Review: Calculus & Diff Eq',           type:'Study Group', host:'Aileen Cruz',  date:'May 8, 2025 · 6:00 PM',  participants:'14/20', desc:'Focused study session covering derivatives, integrals, and differential equations.' },
    { title:'Intro to Machine Learning for Students',      type:'Webinar',     host:'Kevin Reyes',  date:'May 10, 2025 · 4:00 PM', participants:'32/50', desc:'An accessible intro to ML concepts using Python and sklearn — no prior experience needed.' },
    { title:'Resume & Interview Prep with CHED Scholars',  type:'Webinar',     host:'Maria Santos', date:'May 12, 2025 · 3:00 PM', participants:'28/40', desc:'Practical tips on crafting your resume and acing behavioral interviews in the Philippines.' },
    { title:'React & Next.js Study Group',                 type:'Study Group', host:'Paolo Vidal',  date:'May 15, 2025 · 7:00 PM', participants:'8/15',  desc:'Weekly session working through real-world React projects together.' },
  ],
  live: [
    { title:'Accounting 101 Live Q&A', type:'Live', host:'Maria Santos', date:'LIVE NOW', participants:'19/25', desc:'Real-time Q&A on journal entries, ledgers, and financial statements. Join anytime!' },
  ],
  my: [
    { title:'Python for Beginners — Session 3', type:'Study Group', host:'You', date:'May 6, 2025 · 5:00 PM', participants:'6/10', desc:'Your scheduled study group — upcoming session on loops and functions.' },
  ],
};

export const conversationList = [
  {
    name:'Maria Santos', last:"Great! Let's meet tomorrow at 3PM", time:'2m ago', unread:2, color:'#2563EB',
    messages:[
      { from:'them', text:"Hi! I saw your profile and I think we'd be a great match 😊",              time:'10:02 AM' },
      { from:'me',   text:"Hey Maria! Yes, I saw you can teach Accounting — that's exactly what I need!", time:'10:04 AM' },
      { from:'them', text:"And I need Python skills! This is perfect. Want to do a skill swap?",      time:'10:05 AM' },
      { from:'me',   text:'Absolutely! When are you free?',                                           time:'10:07 AM' },
      { from:'them', text:"Great! Let's meet tomorrow at 3PM",                                        time:'10:08 AM' },
    ],
  },
  {
    name:'Kevin Reyes', last:'Can you share the notes from today?', time:'1h ago', unread:1, color:'#7C3AED',
    messages:[
      { from:'them', text:'Hey! Quick question about the Python session tomorrow.', time:'9:00 AM' },
      { from:'me',   text:"Sure, what's up?",                                       time:'9:15 AM' },
      { from:'them', text:'Can you share the notes from today?',                    time:'9:20 AM' },
    ],
  },
  {
    name:'Aileen Cruz', last:'See you at the webinar!', time:'3h ago', unread:0, color:'#059669',
    messages:[
      { from:'me',   text:'Aileen, are you joining the Calculus study group?', time:'Yesterday' },
      { from:'them', text:'Yes! I\'m actually hosting it haha',                time:'Yesterday' },
      { from:'me',   text:'Oh amazing! See you there',                         time:'Yesterday' },
      { from:'them', text:'See you at the webinar!',                           time:'Yesterday' },
    ],
  },
];

export const autoReplies = [
  'That sounds great! 😊',
  'Okay, let me check my schedule.',
  "Absolutely! Let's set that up.",
  'Sounds good to me!',
  "Cool, I'll send you the details.",
];
