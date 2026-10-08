import type { Photo, RoleGroup, Show, SportsTeam } from './types.ts';

/**
 * "Beyond academics" — the person behind the resume.
 *
 * Images: every team and show has an optional `image`. Put a file in
 * public/images/interests/ and set e.g. `image: 'images/interests/real-madrid.jpg'`.
 * Without an image, the card shows its built-in artwork. Either way the
 * picture sits under the red "safelight" until the visitor turns the lights on,
 * so mixed photos still look like one set.
 */
export const beyond = {
  facts: [
    { label: 'Languages', value: 'English, Malayalam (മലയാളം), Hindi (हिन्दी)' },
    { label: 'Creative tools', value: 'Photoshop, DaVinci Resolve, CapCut, Canva' },
  ],

  sports: [
    {
      id: 'real-madrid',
      sport: 'Football',
      team: 'Real Madrid',
      relation: 'Favourite club',
      nickname: 'Los Blancos',
      home: 'Santiago Bernabéu, Madrid',
      colors: ['#F7F5F0', '#FEBE10', '#00529F'],
    },
    {
      id: 'argentina',
      sport: 'Football',
      team: 'Argentina',
      relation: 'Favourite national team',
      nickname: 'La Albiceleste',
      home: 'Buenos Aires',
      colors: ['#75AADB', '#F7F5F0', '#75AADB'],
    },
    {
      id: 'golden-state-warriors',
      sport: 'Basketball',
      team: 'Golden State Warriors',
      relation: 'Favourite NBA team',
      nickname: 'The Dubs',
      home: 'Chase Center, San Francisco',
      colors: ['#1D428A', '#FFC72C', '#1D428A'],
    },
  ] satisfies SportsTeam[] as SportsTeam[],

  shows: [
    { id: 'big-bang-theory', title: 'The Big Bang Theory', years: '2007–2019', seasons: 12 },
    { id: 'friends', title: 'Friends', years: '1994–2004', seasons: 10 },
    { id: 'himym', title: 'How I Met Your Mother', years: '2005–2014', seasons: 9 },
    { id: 'modern-family', title: 'Modern Family', years: '2009–2020', seasons: 11 },
    { id: 'brooklyn-nine-nine', title: 'Brooklyn Nine-Nine', years: '2013–2021', seasons: 8 },
    { id: 'the-office', title: 'The Office', years: '2005–2013', seasons: 9 },
    { id: 'new-girl', title: 'New Girl', years: '2011–2018', seasons: 7 },
  ] satisfies Show[] as Show[],

  photography: {
    text: 'Away from academics and technology, I take photographs. I was Deputy Secretary of the Photography Club in 2024–25, helping run its workshops and competitions.',
    albumUrl:
      'https://photos.google.com/share/AF1QipOyNa-wm5JGqsIxha2DG9_lz5LJKxkvDMQifp9wK5oPNfOzv0fxBiCENdAMVI__dA?key=eV9oZGtpRmktTWNfV29GV192V0MwZnlidE9QY2hB',
    cta: 'View my photography',
    /**
     * Optional: add your own shots to public/images/photography/ and list them
     * here. They play in the viewfinder and appear as a contact sheet below it.
     */
    photos: [] as Photo[],
  },

  extracurricular: [
    {
      title: 'Media and design',
      roles: [
        {
          role: 'Film and Media Convenor',
          organization: 'IIT Palakkad',
          when: 'May 2025 – present',
          note: 'Media and publicity for campus events, and helping teams plan and run them.',
        },
        {
          role: 'Design Head',
          organization: 'Akshar, the Literary Club',
          when: 'Aug 2025 – present',
          note: 'Branding, publicity and social media for club events.',
        },
        {
          role: 'Content and Design Head',
          organization: 'Industry Academia Conclave 7.0',
          when: 'Aug – Oct 2025',
          note: 'Promotional campaigns and material, coordinated with faculty and sponsors.',
        },
        {
          role: 'Media and Publicity Head',
          organization: 'Film and Media Council',
          when: 'May 2024 – Apr 2025',
          note: 'Led publicity for institute events: campaigns, promotional material and outreach.',
        },
        {
          role: 'Deputy Secretary',
          organization: 'Photography Club',
          when: 'May 2024 – May 2025',
          note: 'Helped organize workshops and competitions.',
        },
      ],
    },
    {
      title: 'Events',
      roles: [
        {
          role: 'Hospitality Head',
          organization: 'Petrichor 2026, IIT Palakkad',
          when: 'May 2025 – May 2026',
          note: "Guest accommodation, transport and volunteers for the institute's cultural fest.",
        },
        {
          role: 'Core Team Member',
          organization: 'Industry Academia Conclave',
          when: 'Sep 2024, Sep 2025 and Sep 2026',
          note: "Organizing and running the institute's industry–academia conclave.",
        },
      ],
    },
    {
      title: 'Community',
      roles: [
        {
          role: 'Class Representative',
          organization: 'Data Science and Engineering batch',
          when: 'Aug – Dec 2023 and Aug – Dec 2024',
          note: 'The link between students and faculty for academic updates and feedback.',
        },
        {
          role: 'Library Teaching Assistant',
          organization: 'IIT Palakkad',
          when: 'Feb – May 2025',
          note: 'Supported students and daily operations during extended library hours.',
        },
        {
          role: 'Member',
          organization: 'CognifAI, the AI Club',
          when: 'Aug 2023 – present',
        },
      ],
    },
  ] satisfies RoleGroup[] as RoleGroup[],
};
