export interface FontOption {
  name: string;
  category: 'Sans Serif' | 'Display' | 'Handwriting' | 'Monospace';
  fallback: string;
}

export const FONTS_CATALOG: FontOption[] = [
  // Sans Serif
  { name: 'Montserrat', category: 'Sans Serif', fallback: 'sans-serif' },
  { name: 'Open Sans', category: 'Sans Serif', fallback: 'sans-serif' },
  { name: 'Plus Jakarta Sans', category: 'Sans Serif', fallback: 'sans-serif' },
  
  // Display
  { name: 'Bebas Neue', category: 'Display', fallback: 'sans-serif' },
  { name: 'Cinzel', category: 'Display', fallback: 'serif' },
  { name: 'Lobster', category: 'Display', fallback: 'cursive' },
  { name: 'Luckiest Guy', category: 'Display', fallback: 'cursive' },
  { name: 'Playfair Display', category: 'Display', fallback: 'serif' },
  
  // Handwriting & Script
  { name: 'Pacifico', category: 'Handwriting', fallback: 'cursive' },
  { name: 'Dancing Script', category: 'Handwriting', fallback: 'cursive' },
  { name: 'Great Vibes', category: 'Handwriting', fallback: 'cursive' },
  { name: 'Permanent Marker', category: 'Handwriting', fallback: 'cursive' },
  { name: 'Sacramento', category: 'Handwriting', fallback: 'cursive' },
  
  // Monospace
  { name: 'Roboto Mono', category: 'Monospace', fallback: 'monospace' },
];

export const FONT_CATEGORIES = ['Todas', 'Sans Serif', 'Display', 'Handwriting', 'Monospace'] as const;
