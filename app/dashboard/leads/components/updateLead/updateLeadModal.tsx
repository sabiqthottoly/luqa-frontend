import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TransitionProps } from '@mui/material/transitions';
import {updateLead}  from  '../../leadsSlice'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fieldDefinitions = [
  { label: 'Name', name: 'customer_name', size: { xs: 12, sm: 6 } },
  { label: 'Email', name: 'email', size: { xs: 12, sm: 6 } },
  { label: 'Address', name: 'address', size: { xs: 12 } },
  { label: 'Comments', name: 'comments', size: { xs: 12 } },
  { label: 'State', name: 'state', size: { xs: 12, sm: 4 } },
  { label: 'Country', name: 'country', size: { xs: 12, sm: 4 } },
  { label: 'Mobile', name: 'mobile', size: { xs: 12, sm: 4 } }
];

export default function UpdateModal({ open, onClose, lead }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    customer_name: '',
    email: '',
    address: '',
    comments: '',
    state: '',
    country: '',
    mobile: ''
  });

  React.useEffect(() => {
    if (lead) {
      setFormData({
        customer_name: lead.customer_name,
        email: lead.email,
        address: lead.address,
        comments: lead.comments,
        state: lead.state,
        country: lead.country,
        mobile: lead.mobile
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSave = () => {
  //   // Handle the save action, possibly dispatch an action to update the lead
  //   console.log('Updated Lead Data:', formData);
  //   onClose();
  // };
  const handleSave = () => {
    if (lead && lead.id) {
      dispatch(updateLead({ id: lead.id, leadData: formData }));
    }
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit Lead
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            {fieldDefinitions.map((field) => (
              <Grid key={field.name} item xs={field.size.xs} sm={field.size.sm}>
                <TextField
                  fullWidth
                  margin="normal"
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
}
