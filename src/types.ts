export type Route = 'home' | 'about' | 'discography' | 'contact' | 'privacy' | '404' | string;

export interface Page {
  id: string; // matches route path, e.g. "home", "about", or a custom page path like "shows"
  title: string;
  description: string;
  content: string; // custom page body content/HTML
  customSchema?: string; // custom JSON-LD schema string override
  entities: string[]; // referenced entity IDs
  isCustom?: boolean; // true if added by user
  dateModified: string;
  focusKeywords?: string;
  ogType?: string;
  ogImage?: string;
  isNoIndex?: boolean;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface Entity {
  id: string;
  name: string;
  type: 'Person' | 'MusicGroup' | 'Organization' | 'Place' | 'EducationalOrganization' | 'CreativeWork' | 'Event';
  description: string;
  authoritativeUrl?: string; // e.g. Wikipedia or Spotify Authority
  image?: string;
  sameAs: string[]; // array of social links/secondary sources
  citations: { label: string; url: string; validity: 'high' | 'medium' | 'low' }[];
}

export interface TrackItem {
  title: string;
  url?: string;
}

export interface SongCatalogItem {
  id: string;
  title: string;
  type: 'single' | 'ep' | 'album';
  releaseDate: string;
  image: string;
  about: string;
  spotifyEmbedUrl: string;
  spotifyLink: string;
  appleMusicLink?: string;
  youtubeLink?: string;
  metaLeft: string; // e.g. "RELEASE // FEB 2026"
  metaRight: string; // e.g. "RECORD // NSLB001"
  subHeading?: string;
  tracklist?: string[];
  tracks?: TrackItem[];
  genre?: string;
  primaryArtist?: string;
  producer?: string;
  isrc?: string;
  upc?: string;
  purchaseLink?: string;
  lyrics?: string;
  musicbrainzId?: string;
  wikidataId?: string;
}

export interface SEOVerificationCheck {
  id: string;
  category: 'schema' | 'metadata' | 'compliance';
  label: string;
  description: string;
  status: 'passed' | 'warning' | 'failed';
  feedback: string;
}

export interface SearchConsoleStatus {
  domainVerified: boolean;
  verificationMethod: string;
  sitemaps: { url: string; status: 'Success' | 'Failed' | 'Pending'; submittedAt: string; discoveredUrls: number }[];
  indexingRequests: { [url: string]: { status: 'indexed' | 'requested' | 'unindexed'; requestedAt: string; logs: string[] } };
}

