"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import SelectRequiredColumns from "@/app/ui/components/selectRequiredColumns";
import FiltersModal from "./components/filter/filtersModal";
import AddModal from "./components/addLead/addLeadModal";
import EnhancedTableHead from "./components/tableHeader";
import { Data, DataKey, HeadCell, Order } from "./types/leads.model";
import EnhancedTableToolbar from "./components/filter/toolbar";

const rows = [
  {
    id: 1,
    name: "David",
    poc: "ew",
    source: "ad",
    email: "david@example.com",
    lastTalk: "15 May 2022",
    nextTalk: "20 June 2022",
    status: "positive",
  },
  {
    id: 2,
    name: "Sophie",
    poc: "wqf",
    source: "youtube",
    email: "sophie@example.com",
    lastTalk: "10 April 2022",
    nextTalk: "5 July 2022",
    status: "positive",
  },
  {
    id: 3,
    name: "John",
    poc: "mot",
    source: "reference",
    email: "john@example.com",
    lastTalk: "20 June 2022",
    nextTalk: "25 July 2022",
    status: "positive",
  },
  {
    id: 4,
    name: "Emily",
    poc: "mot",
    source: "reference",
    email: "emily@example.com",
    lastTalk: "5 May 2022",
    nextTalk: "10 August 2022",
    status: "positive",
  },
  {
    id: 5,
    name: "Michael",
    poc: "mot",
    source: "reference",
    email: "michael@example.com",
    lastTalk: "18 June 2022",
    nextTalk: "23 July 2022",
    status: "positive",
  },
  {
    id: 6,
    name: "Emma",
    poc: "mot",
    source: "reference",
    email: "emma@example.com",
    lastTalk: "12 May 2022",
    nextTalk: "15 August 2022",
    status: "positive",
  },
  {
    id: 7,
    name: "Daniel",
    poc: "mot",
    source: "reference",
    email: "daniel@example.com",
    lastTalk: "25 June 2022",
    nextTalk: "30 July 2022",
    status: "positive",
  },
  {
    id: 8,
    name: "Olivia",
    poc: "mot",
    source: "reference",
    email: "olivia@example.com",
    lastTalk: "8 April 2022",
    nextTalk: "3 August 2022",
    status: "positive",
  },
  {
    id: 9,
    name: "Alexander",
    poc: "mot",
    source: "reference",
    email: "alexander@example.com",
    lastTalk: "28 May 2022",
    nextTalk: "2 July 2022",
    status: "positive",
  },
  {
    id: 10,
    name: "Ava",
    poc: "mot",
    source: "reference",
    email: "ava@example.com",
    lastTalk: "14 June 2022",
    nextTalk: "19 July 2022",
    status: "positive",
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "poc",
    numeric: false,
    disablePadding: true,
    label: "POC",
  },
  {
    id: "source",
    numeric: false,
    disablePadding: true,
    label: "Source",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "lastTalk",
    numeric: false,
    disablePadding: true,
    label: "Last Talk",
  },
  {
    id: "nextTalk",
    numeric: false,
    disablePadding: true,
    label: "Next Talk",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

const allColumnsIds = headCells.map((element) => element.id);

export default function Leads() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data | string>("");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = React.useState(false);
  const [addModal, setAddModal] = React.useState();
  const [selectedColumnsIds, setSelectedColumnsIds] = React.useState([
    "id",
    "name",
    "poc",
    "source",
    "email",
    "lastTalk",
    "nextTalk",
    "status",
  ]);

  React.useEffect(() => {
    modifyTableCellsAsperSelectedColummns();
  }, [selectedColumnsIds]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const modifyTableCellsAsperSelectedColummns = () => {};
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleSelectedColumns = (data: string[]) => {
    console.log("data", data);
    setSelectedColumnsIds(data);
  };

  const handleFilterModal = () => {
    setIsOpenFiltersModal(!isOpenFiltersModal);
  };

  // const handleAddModal = () => {
  //   setAddModal(!addModal);
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <h1>Leads</h1>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddModal />
      </Box>
      <SelectRequiredColumns
        allColumns={allColumnsIds}
        handleSelectedColumns={handleSelectedColumns}
      />
      <FiltersModal
        isOpenFiltersModal={isOpenFiltersModal}
        closeFiltersModal={handleFilterModal}
      />
      {selectedColumnsIds.length > 0 ? (
        <Paper sx={{ width: "100%", mb: 2 }} className="">
          <EnhancedTableToolbar
            numSelected={selected.length}
            openFilterModal={handleFilterModal}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              // size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                selectedColumnsIds={selectedColumnsIds}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          className=""
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      {(Object.keys(row) as Array<DataKey>).map(
                        (key, index) => {
                          if (selectedColumnsIds.includes(key)) {
                            return (
                              <>
                                <TableCell
                                  component="th"
                                  key={index}
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                  className=""
                                >
                                  {row[key]}
                                </TableCell>
                              </>
                            );
                          }
                        }
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
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
        </Paper>
      ) : (
        <div>No Columsn Selected</div>
      )}
    </Box>
  );
}
