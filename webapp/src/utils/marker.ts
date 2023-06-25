export interface Marker {
    name: string;
    description: string;
    image: string;
    reviews: string;
    ratings: number;
    position: {
      lat: number;
      lng: number;
    };
  }