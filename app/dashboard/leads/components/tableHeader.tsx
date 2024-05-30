// import {
//   TableRow,
//   TableCell,
//   Checkbox,
//   TableSortLabel,
//   Box,
// } from "@mui/material";

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data
//   ) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// interface Data {
//   id: number;
//   name: string;
//   poc: string;
//   source: string;
//   email: string;
//   lastTalk: string;
//   nextTalk: string;
//   status: string;
// }
// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

// type DataKey = keyof Data;

// const headCells: readonly HeadCell[] = [
//   {
//     id: "id",
//     numeric: true,
//     disablePadding: true,
//     label: "Id",
//   },
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "Name",
//   },
//   {
//     id: "poc",
//     numeric: false,
//     disablePadding: true,
//     label: "POC",
//   },
//   {
//     id: "source",
//     numeric: false,
//     disablePadding: true,
//     label: "Source",
//   },
//   {
//     id: "email",
//     numeric: false,
//     disablePadding: true,
//     label: "Email",
//   },
//   {
//     id: "lastTalk",
//     numeric: false,
//     disablePadding: true,
//     label: "Last Talk",
//   },
//   {
//     id: "nextTalk",
//     numeric: false,
//     disablePadding: true,
//     label: "Next Talk",
//   },
//   {
//     id: "status",
//     numeric: false,
//     disablePadding: true,
//     label: "Status",
//   },
// ];

// type Order = "asc" | "desc";

// function TableHead(props: EnhancedTableProps) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler =
//     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             className=""
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               "aria-label": "select all desserts",
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align="left"
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//             className=""
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// export default TableHead;
