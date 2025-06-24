"use client";

import { useGetUsersQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "../components/header";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const CustomToolbar = () => {
    return (
        <GridToolbarContainer className="flex toolbar gap-2">
            <GridToolbarFilterButton/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "User Name", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex size-full items-center justify-center">
        <div className="size-9">
          <Image
            alt={params.row.userName as string}
            src={`/${params.value}`}
            width={100}
            height={50}
            className="rounded-full h-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

function Users() {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  return (
    <div className="flex flex-col w-full p-8">
      <Header name="Users" />
      <div
        style={{
          height: 650,
          width: "100%",
        }}
      >
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
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

export default Users;
