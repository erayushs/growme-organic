import { type DataTableValue } from "primereact/datatable";

export interface Artwork extends DataTableValue {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
}
