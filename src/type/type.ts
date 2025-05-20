export interface GameType {
  id: string;
  discount: string;
  finalPrice: string;
  img: string;
  name: string;
  originalPrice: string;
  tags: string[];
  mainImg: string;
  description: string;
  releaseDate: string;
  developer: string;
  screenshots: { id: number; path_full: string; path_thumbnail: string }[];
}

export interface GameCard {
  id: number;
  name: string;
  screenshots: { id: number; path_full: string; path_thumbnail: string }[];
  mainImg: string;
  description: string;
  finalPrice: string | null;
  releaseDate: string;
  developer: string[];
}

export interface ShortScreenshotsType {
  id: string;
}

export interface FeaturedGame {
  id: number;
  name: string;
  header_image: string;
  original_price: number | null;
  final_price: number | null;
  discount_percent: number | null;
}
