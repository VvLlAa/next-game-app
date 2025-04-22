export interface GameType {
  id: number;
  added: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { name: string }[];
  short_screenshots: ShortScreenshotsType[];
  parent_platforms: PlatformsType;
  slug: string;
  tags: { name: string; id: number }[];
  description: string | null;
  website: string | null;
  metacritic: number;
}

export interface ShortScreenshotsType {
  id: number;
  image: string;
}

export type PlatformsType = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}[];
