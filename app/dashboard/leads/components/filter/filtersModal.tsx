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
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    closeFiltersModal();
    setOpen(false);
  };

  return (
    // <React.Fragment>
    //   <Dialog
    //     // fullWidth={fullWidth}
    //     // maxWidth={maxWidth}
    //     open={open}
    //     onClose={handleClose}
    //   >
    //     <DialogTitle>Optional sizes</DialogTitle>
    //     <DialogContent sx={{ width: "70%", height: "70vh" }}>
    //       <DialogContentText>
    //         <FilterSelection />
    //       </DialogContentText>
    //       <Box
    //         noValidate
    //         component="form"
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //           m: "auto",
    //           width: "fit-content",
    //         }}
    //       >
    //         <FormControl sx={{ mt: 2, minWidth: 120 }}>
    //           <InputLabel htmlFor="max-width">maxWidth</InputLabel>
    //         </FormControl>
    //         {/* <FormControlLabel
    //           sx={{ mt: 1 }}
    //           control={
    //             <Switch checked={fullWidth} onChange={handleFullWidthChange} />
    //           }
    //           label="Full width"
    //         />  */}
    //       </Box>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose}>Close</Button>
    //     </DialogActions>
    //   </Dialog>
    // </React.Fragment>


    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default FiltersModal;
