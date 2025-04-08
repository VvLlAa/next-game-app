export interface GameType {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    genres: { name: string }[];
    short_screenshots: ShortScreenshotsType[];
    parent_platforms: PlatformsType;
    slug: string;
    tags: { name: string }[];
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