import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  ArtInstituteService,
  type Artwork,
} from "./service/ArtInstituteService";

export default function PaginatorBasicDemo() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtWorks, setSelectedArtWorks] = useState<Artwork[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await ArtInstituteService.fetchArtworks();
      setArtworks(data);
    };
    fetchData();
  }, []);

  return (
    <div className="card">
      <DataTable
        value={artworks}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        selection={selectedArtWorks}
        onSelectionChange={(e) => setSelectedArtWorks(e.value as Artwork[])}
        dataKey="id"
        tableStyle={{ minWidth: "70rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="title" header="Title" style={{ width: "20%" }} />
        <Column
          field="place_of_origin"
          header="Place of Origin"
          style={{ width: "15%" }}
        />
        <Column
          field="artist_display"
          header="Artist"
          style={{ width: "20%" }}
        />
        <Column
          field="inscriptions"
          header="Inscriptions"
          style={{ width: "20%" }}
        />
        <Column
          field="date_start"
          header="Start Date"
          style={{ width: "10%" }}
        />
        <Column field="date_end" header="End Date" style={{ width: "10%" }} />
      </DataTable>
    </div>
  );
}
