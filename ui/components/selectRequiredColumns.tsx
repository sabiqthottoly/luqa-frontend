import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectRequiredColumnsProps {
  allColumns: string[]; // Assuming allColumnsIds is an array of string IDs,
  handleSelectedColumns: (data: string[]) => void;
}

const SelectRequiredColumns: React.FC<SelectRequiredColumnsProps> = ({
  allColumns,
  handleSelectedColumns,
}) => {
  // console.log("allColumns", allColumns);
  const [columnIds, setColumnIds] = React.useState<string[]>(allColumns);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: SelectChangeEvent<typeof columnIds>) => {
    const {
      target: { value },
    } = event;
    setColumnIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log("columnsId0", columnIds);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionButton = () => {
    handleSelectedColumns(columnIds);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          {" "}
          Columns Available
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={columnIds}
          onChange={handleChange}
          input={<OutlinedInput label="Columns Available" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          sx={{ borderRadius: 4 }}
        >
          {allColumns.map((name, index) => (
            <MenuItem
              key={name}
              value={name}
              sx={{ position: "relative" }}
              className="rounded-md"
            >
              <Checkbox checked={columnIds.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
          <div
            style={{
              position: "fixed",
              top: 550,
              background: "white",
              height: 44,
              width: 300,
              zIndex: 44,
            }}
            className="rounded-md text-white bg-blue-500"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                height: "100%",
                gap: 2,
                backgroundColor: "white",
              }}
              className="rounded-md"
            >
              <button className="rounded-md w-1/2 bg-gray-400 font-extrabold">
                cancel
              </button>

              <button
                className=" rounded-md pl-2 font-extrabold w-1/2 bg-blue-500"
                onClick={handleActionButton}
              >
                confirm
              </button>
            </div>
          </div>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectRequiredColumns;
