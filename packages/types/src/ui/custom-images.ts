export interface CustomImage {
  id: string;
  image_name: string;
  mime_type: string;
  width: number;
  height: number;
}
export type CustomImages = Record<string, CustomImage>;
