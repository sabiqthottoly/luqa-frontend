import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
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
import Grid from "@mui/material/Grid";
import FilterSelection from "./filterSelction";
import { SelectChangeEvent } from "@mui/material";


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

type FilterKey = "Name" | "Age" | "Branch" | "POC" | "status" | "Last Talk" | "Next Talk" | "Email";

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

  const [filterValues, setFilterValues] = React.useState<Record<FilterKey, string>>({
    "Name": "",
    "Age": "",
    "Branch": "",
    "POC": "",
    "status": "", 
    "Last Talk": "",
    "Next Talk": "",
    "Email": "",
  });

  const handleFilterChange = (filter: string) => (event: SelectChangeEvent) => {
    setFilterValues((prev) => ({ ...prev, [filter]: event.target.value }));
  };

  const filterOptions = [
    { value: "", label: "None" },
    { value: "value1", label: "Value-1" },
    { value: "value2", label: "Value-2" },
    { value: "value3", label: "Value-3" },
  ];

  return (
    <React.Fragment>
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
              Filters
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} justifyContent="center">
            {Object.keys(filterValues).map((filter, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FilterSelection
                  label={`${filter}`}
                  value={filterValues[filter as FilterKey]}
                  options={filterOptions}
                  onChange={handleFilterChange(filter)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>


        {/* <List>
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
        </List> */}
      </Dialog>
    </React.Fragment>
  );
};

export default FiltersModal;
