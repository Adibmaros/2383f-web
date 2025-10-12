export interface Karya {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  dibuatOleh: string;
  createdAt: string;
  updatedAt: string;
}

export type KaryaResponse = any; // Fallback type for API responses
