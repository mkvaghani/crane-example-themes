export interface Category {
  id: string | number;
  name: string;
  slug?: string;
  url?: string;
  urlPath?: string;
  children?: Category[];
  hasChildren?: boolean;
}
