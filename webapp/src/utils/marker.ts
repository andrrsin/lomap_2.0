export interface Marker {
  url? : string,
    name: string;
    description: string;
    image: string;
    reviews: string[];
    ratings: number;
    category: string;
    position: {
      lat: number;
      lng: number;
    };
    imagesAsFile?: File;
  }


