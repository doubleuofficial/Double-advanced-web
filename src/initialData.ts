import { Page, Entity } from './types';

export const INITIAL_ENTITIES: Entity[] = [
  {
    id: 'william-hartman',
    name: 'William Kirby Hartman',
    type: 'Person',
    description: 'American musical artist, multi-instrumentalist, and veteran of the United States Army. Known professionally as DoubleU, he is the central founder of the No Stories Left Behind narrative movement.',
    authoritativeUrl: 'https://en.wikipedia.org/wiki/William_Kirby_Hartman_placeholder',
    sameAs: [
      'https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG',
      'https://music.apple.com/us/artist/doubleu/placeholder',
      'https://www.youtube.com/@doubleu_official'
    ],
    citations: [
      { label: 'U.S. National Personnel Records Cache', url: 'https://www.archives.gov/personnel-records-center', validity: 'high' },
      { label: 'Florida Birth Certificate Index #2004-04060', url: 'https://www.floridahealth.gov/certificates', validity: 'high' },
      { label: 'Oklahoma County Marriage Certificate #2026-0302', url: 'https://www.oklahomacounty.org/departments/county-clerk', validity: 'high' }
    ]
  },
  {
    id: 'doubleu',
    name: 'DoubleU',
    type: 'MusicGroup',
    description: 'An independent emotional-narrative and soul-trap music project based in Oklahoma City. Characterized by raw acoustic overlays and themes of historical ruptures and survival.',
    authoritativeUrl: 'https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG',
    sameAs: [
      'https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG',
      'https://music.apple.com/us/artist/doubleu/placeholder',
      'https://www.youtube.com/@doubleu_official',
      'https://www.instagram.com/doubleu_official_placeholder'
    ],
    citations: [
      { label: 'Spotify Artist Directory Authority', url: 'https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG', validity: 'high' },
      { label: 'MusicBrainz Official Entity Registry', url: 'https://musicbrainz.org/artist/doubleu-placeholder', validity: 'high' },
      { label: 'No Stories Left Behind Official Catalog', url: 'https://doubleuofficial.online/discography', validity: 'medium' }
    ]
  },
  {
    id: 'nick-hartman',
    name: 'Nick Fairbanks Hartman',
    type: 'Person',
    description: 'Late adoptive father of William Kirby Hartman, who passed on October 10, 2014, following a defining rupture on October 9, 2014. His memory and lessons serve as the emotional cornerstone of DoubleU\'s catalog.',
    sameAs: [
      'https://www.findagrave.com/memorial/nick-fairbanks-hartman-placeholder'
    ],
    citations: [
      { label: 'State of Florida Death Registry #2014-1010', url: 'https://www.floridahealth.gov/certificates', validity: 'high' },
      { label: 'Official Memorial Record Archive', url: 'https://www.findagrave.com', validity: 'medium' }
    ]
  },
  {
    id: 'susie-hartman',
    name: 'Susie Annette Hartman',
    type: 'Person',
    description: 'Maternal great-aunt of William Kirby Hartman who provided loving guardianship and sanctuary following family transitions.',
    sameAs: [],
    citations: [
      { label: 'Florida Guardianship Archives', url: 'https://www.floridacourts.org', validity: 'medium' }
    ]
  },
  {
    id: 'katelynn-hartman',
    name: 'Katelynn Kay Hartman',
    type: 'Person',
    description: 'Spouse of William Kirby Hartman. The couple married on March 2, 2026, establishing a shared creative foundation.',
    sameAs: [],
    citations: [
      { label: 'Oklahoma Marriage Records Registry', url: 'https://www.oklahomacounty.org/departments/county-clerk', validity: 'high' }
    ]
  },
  {
    id: 'nslb-records',
    name: 'No Stories Left Behind Records',
    type: 'Organization',
    description: 'Independent artistic label and cataloging collective dedicated to preserving raw emotional diaries and acoustic journals of survival.',
    authoritativeUrl: 'https://doubleuofficial.online/',
    sameAs: [
      'https://doubleuofficial.online/'
    ],
    citations: [
      { label: 'Oklahoma State Business Registrar', url: 'https://www.sos.ok.gov', validity: 'high' }
    ]
  },
  {
    id: 'jacksonville',
    name: 'Jacksonville, Florida',
    type: 'Place',
    description: 'Geographic location of birth and early childhood for William Kirby Hartman.',
    authoritativeUrl: 'https://en.wikipedia.org/wiki/Jacksonville,_Florida',
    sameAs: [
      'https://en.wikipedia.org/wiki/Jacksonville,_Florida'
    ],
    citations: [
      { label: 'Wikipedia Jacksonville Article', url: 'https://en.wikipedia.org/wiki/Jacksonville,_Florida', validity: 'high' }
    ]
  },
  {
    id: 'hopkinsville',
    name: 'Hopkinsville, Kentucky',
    type: 'Place',
    description: 'Geographic center of formative teenage years and teenage school band involvement.',
    authoritativeUrl: 'https://en.wikipedia.org/wiki/Hopkinsville,_Kentucky',
    sameAs: [
      'https://en.wikipedia.org/wiki/Hopkinsville,_Kentucky'
    ],
    citations: [
      { label: 'Wikipedia Hopkinsville Article', url: 'https://en.wikipedia.org/wiki/Hopkinsville,_Kentucky', validity: 'high' }
    ]
  },
  {
    id: 'us-army',
    name: 'United States Army',
    type: 'Organization',
    description: 'The land warfare service branch of the United States Armed Forces, responsible for instilling the active duty structure, order, and rigorous discipline reflected in DoubleU\'s creative work ethic.',
    authoritativeUrl: 'https://www.army.mil',
    sameAs: [
      'https://www.army.mil',
      'https://en.wikipedia.org/wiki/United_States_Army'
    ],
    citations: [
      { label: 'U.S. Army Official Portal', url: 'https://www.army.mil', validity: 'high' }
    ]
  },
  {
    id: 'okc',
    name: 'Oklahoma City, Oklahoma',
    type: 'Place',
    description: 'Current geographic operations base and region associated with the 405 area code, inspiring the single Faded 405.',
    authoritativeUrl: 'https://en.wikipedia.org/wiki/Oklahoma_City',
    sameAs: [
      'https://en.wikipedia.org/wiki/Oklahoma_City'
    ],
    citations: [
      { label: 'Wikipedia Oklahoma City Entry', url: 'https://en.wikipedia.org/wiki/Oklahoma_City', validity: 'high' }
    ]
  }
];

export const INITIAL_PAGES: Page[] = [
  {
    id: 'home',
    title: 'DoubleU | Official Vault',
    description: 'Enter the official DoubleU archive. Join the No Stories Left Behind movement, exploring the raw emotional hip-hop narratives of William Kirby Hartman.',
    content: `
      <h2>The Sovereign Vault of DoubleU</h2>
      <p>Welcome narrator. This portal is the centralized digital coordinate of <strong>DoubleU</strong>, housing the memories, sonic journals, and acoustic foundations tracked by <strong>William Kirby Hartman</strong>.</p>
      <p>Under the banner of the <strong>No Stories Left Behind movement</strong>, we believe every rupture carries an acoustic footprint. We do not bury our losses; we track them. Stream our latest single, explore the archives, and document your narrative.</p>
    `,
    entities: ['doubleu', 'william-hartman', 'nslb-records', 'okc'],
    isCustom: false,
    dateModified: '2026-06-26'
  },
  {
    id: 'about',
    title: 'The Journey | William Kirby Hartman',
    description: 'Explore the biography of William Kirby Hartman (DoubleU). Born in Jacksonville, Florida, molded by Hopkinsville school bands, US Army discipline, and based in OKC.',
    content: `
      <h2>The Chronological Journey</h2>
      <p><strong>William Kirby Hartman</strong> was born on April 6, 2004, in Jacksonville, Florida. He spent his early childhood years attending Martin Luther King Jr. Elementary School, guided by his maternal great-aunt, <strong>Susie Annette Hartman</strong>.</p>
      <p>A defining, permanent transition occurred on October 10, 2014, with the passing of his adoptive father <strong>Nick Fairbanks Hartman</strong>. This early rupture became the gravitational axis of his musical worldview.</p>
      <p>Moving to Hopkinsville, Kentucky, William entered school bands in 6th grade, remaining active through 12th grade at Hopkinsville High School. The band room became a structural sanctuary, allowing percussion and acoustic arrangements to act as conduits for internal survival.</p>
      <p>Following high school, William enlisted in the <strong>United States Army</strong>, gaining the intense discipline and operational order that directs his writing and engineering today. Married on March 2, 2026, to <strong>Katelynn Kay Hartman</strong>, he is now based in Oklahoma City (the 405), launching DoubleU.</p>
    `,
    entities: ['william-hartman', 'nick-hartman', 'susie-hartman', 'katelynn-hartman', 'jacksonville', 'hopkinsville', 'us-army', 'okc'],
    isCustom: false,
    dateModified: '2026-06-26'
  },
  {
    id: 'discography',
    title: 'DoubleU Official Discography | The Catalog',
    description: 'Explore the complete audio catalog of DoubleU. Stream releases including Faded 405, Dear Author, and Nights On The Fault.',
    content: `
      <h2>The Master Sound Archives</h2>
      <p>Every single and project released by DoubleU represents a documented landmark. All tracks are mixed and mastered under the sovereign guidelines of No Stories Left Behind Records.</p>
      <ul>
        <li><strong>Faded 405</strong> (Single - Feb 2026)</li>
        <li><strong>Dear Author</strong> (Single - Apr 2026)</li>
        <li><strong>Nights On The Fault</strong> (Album - Jun 2026)</li>
      </ul>
    `,
    entities: ['doubleu', 'nslb-records'],
    isCustom: false,
    dateModified: '2026-06-26'
  },
  {
    id: 'contact',
    title: 'Contact & Booking | DoubleU Official Hub',
    description: 'Get in touch with DoubleU management and the No Stories Left Behind team in Oklahoma City. Book live sessions, press interviews, and licensing.',
    content: `
      <h2>Intake & Secure Transmission Console</h2>
      <p>For press coordination, event booking, or licensing inquiries regarding the DoubleU master catalog, communicate through our verified channels.</p>
      <p>The centralized management office is based out of Oklahoma City, Oklahoma.</p>
    `,
    entities: ['doubleu', 'nslb-records', 'okc'],
    isCustom: false,
    dateModified: '2026-06-26'
  },
  {
    id: 'privacy',
    title: 'Privacy Registry | DoubleU Official Vault',
    description: 'Transparency registry and privacy compliance under the No Stories Left Behind network architecture, including Google AdSense cookie parameters.',
    content: `
      <h2>Compliance & Sovereignty Charter</h2>
      <p>This privacy registry details the cookie usage, compliance architectures, and web standard practices deployed under the No Stories Left Behind domain.</p>
      <p>We actively comply with Google AdSense terms and preserve narrator data with maximum military-grade clearance protocols.</p>
    `,
    entities: ['nslb-records'],
    isCustom: false,
    dateModified: '2026-06-26'
  }
];
