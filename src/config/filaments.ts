export interface FilamentColor {
  name: string;
  hex: string;
  category?: 'Classic' | 'Vibrant' | 'Silk / Metal';
}

export const PLA_PRESETS: FilamentColor[] = [
  { name: 'Branco Neve (Snow White)', hex: '#FFFFFF', category: 'Classic' },
  { name: 'Preto Profundo (Deep Black)', hex: '#1A1A1A', category: 'Classic' },
  { name: 'Cinza Espacial (Space Gray)', hex: '#707070', category: 'Classic' },
  { name: 'Mafagrafos Vinho (Signature)', hex: '#81314D', category: 'Classic' },
  { name: 'Vermelho Fogo (Fire Red)', hex: '#E63946', category: 'Vibrant' },
  { name: 'Azul Celeste (Sky Blue)', hex: '#38BDF8', category: 'Vibrant' },
  { name: 'Azul Cobalto (Royal Blue)', hex: '#1D4ED8', category: 'Vibrant' },
  { name: 'Amarelo Canário (Canary Yellow)', hex: '#FACC15', category: 'Vibrant' },
  { name: 'Verde Bambu (Bamboo Green)', hex: '#22C55E', category: 'Vibrant' },
  { name: 'Laranja Elétrico (Electric Orange)', hex: '#FB923C', category: 'Vibrant' },
  { name: 'Rosa Chiclete (Bubblegum Pink)', hex: '#F472B6', category: 'Vibrant' },
  { name: 'Roxo Lavanda (Lavender Purple)', hex: '#A855F7', category: 'Vibrant' },
  { name: 'Dourado Silk (Silk Gold)', hex: '#EAB308', category: 'Silk / Metal' },
  { name: 'Cobre Metálico (Metallic Copper)', hex: '#B45309', category: 'Silk / Metal' },
  { name: 'Prata Alumínio (Silver Aluminum)', hex: '#CBD5E1', category: 'Silk / Metal' },
];
