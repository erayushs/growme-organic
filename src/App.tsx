import { useState, useEffect, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import {
  DataTable,
  type DataTablePageEvent,
  type DataTableValue,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import type { Artwork } from "./types/artwork";

export default function PaginatorBasicDemo() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectRowInput, setSelectRowInput] = useState(0);
  const [appliedSelectRow, setAppliedSelectRow] = useState(0);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => {
    const saved = localStorage.getItem("selectedIds");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const op = useRef<OverlayPanel>(null);

  const rowsPerPage = 7;

  // localStorage saving
  useEffect(() => {
    localStorage.setItem("selectedIds", JSON.stringify([...selectedIds]));
  }, [selectedIds]);

  const currentPageSelection = artworks.filter((a) => selectedIds.has(a.id));

  const onSelectionChange = (e: { value: Artwork[] }) => {
    const newIds = new Set(selectedIds);

    // add selected
    e.value.forEach((art) => newIds.add(art.id));

    // remove unselected (only from current page)
    artworks.forEach((art) => {
      if (!e.value.find((sel) => sel.id === art.id)) {
        newIds.delete(art.id);
      }
    });

    setSelectedIds(newIds);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}`
      );
      const data = await res.json();

      const newPageData = data.data as Artwork[];
      setArtworks(newPageData);
      setTotalRecords(data.pagination.total);

      const startIndex = (page - 1) * rowsPerPage + 1;

      const shouldSelect = newPageData.filter((_, idx) => {
        const globalIndex = startIndex + idx;
        return globalIndex <= Number(appliedSelectRow);
      });

      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        shouldSelect.forEach((art) => newSet.add(art.id));
        return newSet;
      });

      setLoading(false);
    };
    fetchData();
  }, [page, appliedSelectRow]);

  const onPageChange = (event: DataTablePageEvent) => {
    setPage((event.page ?? 0) + 1);
  };

  return (
    <div className="card">
      <DataTable
        paginator
        first={(page - 1) * rowsPerPage}
        rows={rowsPerPage}
        lazy
        onPage={onPageChange}
        value={artworks as unknown as DataTableValue[]}
        totalRecords={totalRecords}
        loading={loading}
        selection={currentPageSelection}
        onSelectionChange={(e) => {
          onSelectionChange({ value: e.value as Artwork[] });
        }}
        dataKey="id"
        tableStyle={{ minWidth: "70rem" }}
      >
        <Column
          selectionMode="multiple"
          header={
            <>
              <div className="w-[30px] h-[30px]">
                <img
                  src="./chevron-down.svg"
                  alt="chevron down"
                  className="w-full h-full cursor-pointer"
                  onClick={(e) => op.current?.toggle(e)}
                />
              </div>
              <OverlayPanel ref={op}>
                <div className="flex flex-col gap-4">
                  <InputText
                    type="number"
                    className="p-inputtext-sm"
                    placeholder="Select rows..."
                    value={String(selectRowInput)}
                    onChange={(e) => setSelectRowInput(Number(e.target.value))}
                  />

                  <Button
                    label="Submit"
                    className="w-[100px] h-[40px] self-end"
                    onClick={() => {
                      setAppliedSelectRow(selectRowInput);
                      op.current?.hide();
                    }}
                  />
                </div>
              </OverlayPanel>
            </>
          }
          headerClassName="[&_div.p-column-header-content]:justify-between xl:w-[7%] 2xl:w-[5%] w-[9%] [&_div.p-column-header-content]:flex-row-reverse"
        />
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
