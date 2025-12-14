const news = [
  {
    id: 'n1',
    title: 'Community cleanup goes green',
    category: 'community',
    content: 'Abaturage bateraniye mu isuku y’umujyi... (full article content here).',
    image: '/logo.png',
    author: 'author@nx.rw',
    status: 'published',
    createdAt: new Date().toISOString(),
    likes: 12,
    views: 230,
    isVideo: false
  },
  {
    id: 'n2',
    title: 'Local team wins championship',
    category: 'sport',
    content: 'Ikipe yaho yabaye iya mbere mu marushanwa...',
    image: '/logo.png',
    author: 'author@nx.rw',
    status: 'published',
    createdAt: new Date().toISOString(),
    likes: 45,
    views: 1020,
    isVideo: true
  },
  // add more items up to 12+ for pagination & carousel
  {
    id: 'n3',
    title: 'Education reforms announced',
    category: 'education',
    content: 'Minisiteri yatangaje impinduka mu burezi...',
    image: '/logo.png',
    author: 'author@nx.rw',
    status: 'published',
    createdAt: new Date().toISOString(),
    likes: 5,
    views: 88,
    isVideo: false
  },
  {
    id: 'n4',
    title: 'Culture festival this weekend',
    category: 'culture',
    content: 'Hazabera igitaramo cyo gusangiza umuco...',
    image: '/logo.png',
    author: 'author@nx.rw',
    status: 'published',
    createdAt: new Date().toISOString(),
    likes: 22,
    views: 410,
    isVideo: false
  },
  {
    id: 'n5',
    title: 'Tech startups to watch',
    category: 'business',
    content: 'Urutonde rw\'amasosiyete y’ikoranabuhanga...',
    image: '/logo.png',
    author: 'author@nx.rw',
    status: 'published',
    createdAt: new Date().toISOString(),
    likes: 32,
    views: 620,
    isVideo: false
  },
  {
    id: 'n6',
    title: 'TV special: Interview with leader',
    category: 'tv',
    content: 'Ikiganiro cyihariye ku muyobozi w\'igihugu...',
    image: '/logo.png',
    author: 'author@nx.rw',
    status: 'published',
    createdAt: new Date().toISOString(),
    likes: 18,
    views: 300,
    isVideo: true
  },
  {
    id: 'n7',
    title: 'Opinion: The future of cities',
    category: 'opinion',
    content: 'Umwanditsi arasobanura uko imijyi izaba imeze...',
    image: '/logo.png',
    author: 'author@nx.rw',
    status: 'published',
    createdAt: new Date().toISOString(),
    likes: 8,
    views: 150,
    isVideo: false
  }
];

export default news;
