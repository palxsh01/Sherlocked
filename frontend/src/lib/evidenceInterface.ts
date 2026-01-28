export interface Evidence {
  _id: string;
  phase: number;
  title: string;
  type: "photo" | "document" | "digital" | "forensic";
  media: string;
  description: string;
  details: string;
}