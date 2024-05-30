"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import SelectRequiredColumns from "@/app/ui/components/selectRequiredColumns";
import FiltersModal from "./components/filter/filtersModal";

interface Data {
  id: number;
  name: string;
  poc: string;
  source: string;
  email: string;
  lastTalk: string;
  nextTalk: string;
  status: string;
}

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

type Order = "asc" | "desc";

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

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
type DataKey = keyof Data;

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

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  selectedColumnsIds: string[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const [headerCellsColumns, setHeaderCellsColumns] = React.useState(headCells);
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    selectedColumnsIds,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            className=""
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headerCellsColumns
          .filter((headCell) => selectedColumnsIds.includes(headCell.id))
          .map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              className=""
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  openFilterModal: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, openFilterModal } = props;

  return (
    <Toolbar
      className="br-28"
      sx={{
        borderRadius: "28px",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {/* Nutrition */}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={openFilterModal}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function Leads() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data | string>("");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = React.useState(false);
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

  return (
    <Box sx={{ width: "100%" }}>
      <h1>Leads</h1>
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

                      {(Object.keys(row) as Array<DataKey>).map((key) => {
                        if (selectedColumnsIds.includes(key)) {
                          return (
                            <>
                              <TableCell
                                component="th"
                                // id={labelId}
                                scope="row"
                                padding="none"
                                className=""
                              >
                                {row[key]}
                              </TableCell>
                            </>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={
                      {
                        // height: (dense ? 33 : 53) * emptyRows,
                      }
                    }
                  >
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

      {/* <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
 
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Deactivate account</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
          <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div> */}
    </Box>
  );
}
