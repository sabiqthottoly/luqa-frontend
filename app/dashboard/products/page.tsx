"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import AddProductModal from "./addProductModal"

// Define the columns with new fields and adjust widths using flex
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "productCode", headerName: "Product Code", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "featuredImages", headerName: "Featured Images", flex: 1.5 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.75,
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

// Initial rows data
const initialRows = [
  { id: 1, name: "Product 1", productCode: "P001", category: "Category 1", featuredImages: "image1.jpg" },
  { id: 2, name: "Product 2", productCode: "P002", category: "Category 2", featuredImages: "image2.jpg" },
  { id: 3, name: "Product 3", productCode: "P003", category: "Category 1", featuredImages: "image3.jpg" },
  { id: 4, name: "Product 4", productCode: "P004", category: "Category 3", featuredImages: "image4.jpg" },
  { id: 5, name: "Product 5", productCode: "P005", category: "Category 2", featuredImages: "image5.jpg" },
  { id: 6, name: "Product 6", productCode: "P006", category: "Category 1", featuredImages: "image6.jpg" },
  { id: 7, name: "Product 7", productCode: "P007", category: "Category 3", featuredImages: "image7.jpg" },
  { id: 8, name: "Product 8", productCode: "P008", category: "Category 2", featuredImages: "image8.jpg" },
  { id: 9, name: "Product 9", productCode: "P009", category: "Category 1", featuredImages: "image9.jpg" },
];

export default function DataTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [searchText, setSearchText] = React.useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredRows = initialRows.filter((row) =>
      row.name.toLowerCase().includes(value) ||
      row.productCode.toLowerCase().includes(value) ||
      row.category.toLowerCase().includes(value) ||
      row.featuredImages.toLowerCase().includes(value)
    );
    setRows(filteredRows);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ width: "300px" }}
        />
        <AddProductModal />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
