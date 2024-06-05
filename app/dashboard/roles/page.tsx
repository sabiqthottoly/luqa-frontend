"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoleModal from "../roles/addRoleModal";


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "firstName", headerName: "Name", width: 400 },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => (
      <div>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];

const rows = [
  { id: 1, firstName: "Jon" },
  { id: 2, firstName: "Cersei" },
  { id: 3, firstName: "Jaime" },
  { id: 4, firstName: "Arya", age: 16 },
  { id: 5, firstName: "Daenerys" },
  { id: 6, firstName: "Alina fernandes" },
  { id: 7, firstName: "Ferrara" },
  { id: 8, firstName: "Rossini" },
  { id: 9, firstName: "Harvey" },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddRoleModal />
      </Box>
      <br></br>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
