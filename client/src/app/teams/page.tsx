"use client";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTeamsQuery } from "@/state/api";
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Header from "../components/header";
import { useAppSelector } from "../redux";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer className="flex toolbar gap-2">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUserName", headerName: "Product Owner", width: 200 },
  { field: "projectManagerUserName", headerName: "Project Owner", width: 200 },
];

function Teams() {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading teams</div>;
  return (
    <div className="flex flex-col w-full p-8">
      <Header name="Teams" />
      <div
        style={{
          height: 650,
          width: "100%",
        }}
      >
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode ?? false)}
        />
      </div>
    </div>
  );
}

export default Teams;
