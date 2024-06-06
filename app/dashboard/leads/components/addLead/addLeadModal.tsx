
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { TransitionProps } from '@mui/material/transitions';
import Grid from '@mui/material/Grid';
import {useDispatch,useSelector} from "react-redux"
import {AppDispatch} from "../../../../../redux/store"
import {createLead} from "../../../leads/leadsSlice"

interface FieldRowProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({ label, name, value, onChange }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="normal"
    />
  </Grid>
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    source_of_lead: '',
    comments: '',
    state: '',
    mobile: '',
    address: '',
    country: ''
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  
  const handleSubmit = () => {
    dispatch(createLead(formData));
    handleClose();
  };
  
  // Define the field configuration
  // const fields = [
  //   { label: 'Name', name: 'name' },
  //   { label: 'Email', name: 'email' },
  //   { label: 'Source', name: 'source' },
  //   { label: 'Country', name: 'country' },
  //   { label: 'State', name: 'state' },
  //   { label: 'Phone', name: 'phone' },
  //   { label: 'Address', name: 'address' },
  //   { label: 'Comments', name: 'comments' }
  // ];
  const fields = [
    { label: 'Name', name: 'customer_name' },
    { label: 'Email', name: 'email' },
    { label: 'Source', name: 'source_of_lead' },
    { label: 'Country', name: 'country' },
    { label: 'State', name: 'state' },
    { label: 'Phone', name: 'mobile' },
    { label: 'Address', name: 'address' },
    { label: 'Comments', name: 'comments' }
  ];

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add leads
      </Button>
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
              Add Leads
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            {fields.map((field) => (
              <FieldRow
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}
          </Grid>
        </List>
      </Dialog>
    </React.Fragment>
  );
}