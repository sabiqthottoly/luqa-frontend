"use client";

import * as React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Tooltip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddStaffModal from './components/addStaffModal';

const rows = [
  { id: 1, name: 'David', mobile: '1234567890', email: 'david@example.com', role: 'Manager', status: 'Active' },
  { id: 2, name: 'Sophie', mobile: '0987654321', email: 'sophie@example.com', role: 'Staff', status: 'Inactive' },
  { id: 3, name: 'John', mobile: '4561237890', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 4, name: 'Emily', mobile: '3214569870', email: 'emily@example.com', role: 'Manager', status: 'Inactive' },
  { id: 5, name: 'Michael', mobile: '7891234560', email: 'michael@example.com', role: 'Staff', status: 'Active' },
  { id: 6, name: 'Emma', mobile: '6543217890', email: 'emma@example.com', role: 'Admin', status: 'Inactive' },
  { id: 7, name: 'Daniel', mobile: '9876543210', email: 'daniel@example.com', role: 'Manager', status: 'Active' },
  { id: 8, name: 'Olivia', mobile: '3217896540', email: 'olivia@example.com', role: 'Staff', status: 'Inactive' },
  { id: 9, name: 'Alexander', mobile: '1237894560', email: 'alexander@example.com', role: 'Admin', status: 'Active' },
  { id: 10, name: 'Ava', mobile: '7894561230', email: 'ava@example.com', role: 'Manager', status: 'Inactive' },
  { id: 11, name: 'Ava', mobile: '7894561230', email: 'ava@example.com', role: 'Manager', status: 'Inactive' },
  { id: 12, name: 'Ava', mobile: '7894561230', email: 'ava@example.com', role: 'Manager', status: 'Inactive' },
];

export default function Staffs() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <h1>Staffs</h1>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={handleModalOpen}>
          Add Staff
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 5, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="staffs table">
          <TableHead>
            <TableRow>
              <TableCell>Sl. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddStaffModal open={isModalOpen} handleClose={handleModalClose} />
    </Box>
  );
}
