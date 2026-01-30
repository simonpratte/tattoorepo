// Artist data types
export interface Artist {
  id: string;
  name: string;
  studioName: string;
  bio: string;
  location: ArtistLocation;
  styles: ArtStyle[];
  portfolio: PortfolioImage[];
  contact: ArtistContact;
  isFeatured: boolean;
  avatarUrl: string;
}

export interface ArtistLocation {
  city: string;
  stateProvince: string;
  country: string;
  region: Region;
}

export interface PortfolioImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArtistContact {
  instagram?: string;
  website?: string;
  bookingUrl?: string;
  email?: string;
}

// Taxonomy types
export type ArtStyle = 
  | 'traditional'
  | 'realism'
  | 'neo-traditional'
  | 'watercolor'
  | 'geometric'
  | 'blackwork'
  | 'fine-line'
  | 'japanese'
  | 'tribal'
  | 'dotwork'
  | 'minimalist'
  | 'portrait'
  | 'new-school'
  | 'chicano'
  | 'trash-polka';

export type Region =
  | 'west-coast'
  | 'east-coast'
  | 'midwest'
  | 'south'
  | 'quebec'
  | 'ontario'
  | 'british-columbia'
  | 'prairies'
  | 'atlantic'
  | 'europe'
  | 'asia'
  | 'australia';

// Filter state
export interface FilterState {
  regions: Region[];
  styles: ArtStyle[];
  searchQuery: string;
}

// Taxonomy display mappings
export const ART_STYLE_LABELS: Record<ArtStyle, { en: string; fr: string }> = {
  'traditional': { en: 'Traditional', fr: 'Traditionnel' },
  'realism': { en: 'Realism', fr: 'Réalisme' },
  'neo-traditional': { en: 'Neo-Traditional', fr: 'Néo-Traditionnel' },
  'watercolor': { en: 'Watercolor', fr: 'Aquarelle' },
  'geometric': { en: 'Geometric', fr: 'Géométrique' },
  'blackwork': { en: 'Blackwork', fr: 'Blackwork' },
  'fine-line': { en: 'Fine Line', fr: 'Ligne Fine' },
  'japanese': { en: 'Japanese', fr: 'Japonais' },
  'tribal': { en: 'Tribal', fr: 'Tribal' },
  'dotwork': { en: 'Dotwork', fr: 'Dotwork' },
  'minimalist': { en: 'Minimalist', fr: 'Minimaliste' },
  'portrait': { en: 'Portrait', fr: 'Portrait' },
  'new-school': { en: 'New School', fr: 'New School' },
  'chicano': { en: 'Chicano', fr: 'Chicano' },
  'trash-polka': { en: 'Trash Polka', fr: 'Trash Polka' },
};

export const REGION_LABELS: Record<Region, { en: string; fr: string }> = {
  'west-coast': { en: 'West Coast', fr: 'Côte Ouest' },
  'east-coast': { en: 'East Coast', fr: 'Côte Est' },
  'midwest': { en: 'Midwest', fr: 'Midwest' },
  'south': { en: 'South', fr: 'Sud' },
  'quebec': { en: 'Quebec', fr: 'Québec' },
  'ontario': { en: 'Ontario', fr: 'Ontario' },
  'british-columbia': { en: 'British Columbia', fr: 'Colombie-Britannique' },
  'prairies': { en: 'Prairies', fr: 'Prairies' },
  'atlantic': { en: 'Atlantic', fr: 'Atlantique' },
  'europe': { en: 'Europe', fr: 'Europe' },
  'asia': { en: 'Asia', fr: 'Asie' },
  'australia': { en: 'Australia', fr: 'Australie' },
};

// Get all styles as array
export const ALL_STYLES: ArtStyle[] = Object.keys(ART_STYLE_LABELS) as ArtStyle[];

// Get all regions as array
export const ALL_REGIONS: Region[] = Object.keys(REGION_LABELS) as Region[];
