export interface Location {
  address: string;
  city: string;
  lat: number;
  lng: number;
  serviceArea: string;
  postcode: string;
}

export interface District {
  features: Feature[];
}

interface Feature {
  type: 'Polygon';
  geometry: {
    type: 'Polygon';
    coordinates: [Coordinate[]]
  };
}

export type Coordinate = [Lat, Lng]
type Lat = number;
type Lng = number;
