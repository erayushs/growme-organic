export interface Artwork {
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
}

export const ArtInstituteService = {
  async fetchArtworks(): Promise<Artwork[]> {
    const res = await fetch("https://api.artic.edu/api/v1/artworks?page=1");
    const data = await res.json();
    return data.data as Artwork[];
  },
};
