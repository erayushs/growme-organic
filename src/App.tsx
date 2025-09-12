import { useState, useEffect, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { DataTable, type DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export interface Artwork {
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
}

export default function PaginatorBasicDemo() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);

  const [selectedArtWorks, setSelectedArtWorks] = useState<Artwork[]>();
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const op = useRef<OverlayPanel>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const res = await fetch(
  //       `https://api.artic.edu/api/v1/artworks?page=${page}`
  //     );
  //     const data = await res.json();

  //     setArtworks(data.data as Artwork[]);
  //     setTotalRecords(data.pagination.total);

  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [page]);

  const onPageChange = (event: DataTablePageEvent) => {
    setPage((event.page ?? 0) + 1);
  };

  return (
    <div className="card">
      <DataTable // <--|
        paginator //   |__________________
        first={(page - 1) * 7} //       |
        rows={7} //                     |
        lazy //                     DataTablw will not try to load all data at once.
        onPage={onPageChange}
        value={artworks}
        totalRecords={totalRecords}
        loading={loading}
        selection={selectedArtWorks}
        onSelectionChange={(e) => setSelectedArtWorks(e.value as Artwork[])}
        dataKey="id"
        tableStyle={{ minWidth: "70rem" }}
      >
        <Column
          selectionMode="multiple"
          header={
            <>
              <img
                src="./chevron-down.svg"
                alt="chevron down"
                className="w-[30px] h-[30px] cursor-pointer"
                onClick={(e) => op.current?.toggle(e)}
              />
              <OverlayPanel ref={op}>
                <div className="flex flex-col gap-4">
                  <InputText
                    type="text"
                    className="p-inputtext-sm"
                    placeholder="Select rows..."
                  />

                  <Button
                    label="Submit"
                    className="w-[100px] h-[40px] self-end"
                  />
                </div>
              </OverlayPanel>
            </>
          }
          headerStyle={{
            width: "4rem",
          }}
          headerClassName="[&_div.p-column-header-content]:justify-between [&_div.p-column-header-content]:flex-row-reverse"
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
