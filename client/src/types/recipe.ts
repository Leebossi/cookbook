export type Recipe = {
  id: number;
  name: string;
  type: string | null;
  ingredients?: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions?: {
    id: number;
    step: number;
    instruction: string;
  }[];
};
