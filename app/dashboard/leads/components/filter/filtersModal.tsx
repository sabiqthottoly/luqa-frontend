import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FilterSelection from "./filterSelction";

interface FiltersModalProps {
  isOpenFiltersModal: boolean;
  closeFiltersModal: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpenFiltersModal,
  closeFiltersModal,
}) => {
  const [open, setOpen] = React.useState(isOpenFiltersModal);
  //   const [fullWidth, setFullWidth] = React.useState(true);
  //   const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

  React.useEffect(() => {
    setOpen(isOpenFiltersModal);
  }, [isOpenFiltersModal]);

  const handleClose = () => {
    closeFiltersModal();
    setOpen(false);
  };

  //   const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
  //     setMaxWidth(
  //       // @ts-expect-error autofill of arbitrary value is not handled.
  //       event.target.value
  //     );
  //   };

  //   const handleFullWidthChange = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setFullWidth(event.target.checked);
  //   };

  return (
    <React.Fragment>
      <Dialog
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent sx={{ width: "70%", height: "70vh" }}>
          <DialogContentText>
            <FilterSelection />
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
            </FormControl>
            {/* <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            />  */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FiltersModal;
