export interface Ad {
  id: number;
  title: string;
  image: string;
  link: string;
  style: "square" | "horizontal" | "vertical";
  weight: number;
  is_active: boolean;
  created?: string;
  modified?: string;
}
