export interface BuildBoxItem {
  id: string;
  name: string;
  price: number | null;
  image?: string;
  available: boolean;
}

export interface BuildBoxSection {
  id: string;
  name: string;
  description?: string;
  required?: boolean;
  items: BuildBoxItem[];
}
