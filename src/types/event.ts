export interface EventPackage {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  minimumGuests?: number;
  maximumGuests?: number;
  price: number | null;
}
