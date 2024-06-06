import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import InputField from './inputFieldForAddProduct';
import SelectField from './selectFieldForAddProduct';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const productCategories = ["Laptop", "SmartPhone", "Steel"];
const statuses = ["Active", "Inactive"];

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    slug: '',
    product_category: '',
    branch: '',
    product_code: '',
    product_description: '',
    product_image: '',
    status: '',
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name as string]: value as string
    }));
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box>
        <Button variant="contained" onClick={handleClickOpen}>
          Add products
        </Button>
      </Box>

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
              Product Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3, px: 6}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SelectField label="Product Category" name="product_category" value={formData.product_category} onChange={handleSelectChange} options={productCategories} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Product Code" name="product_code" value={formData.product_code} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Product Description" name="product_description" value={formData.product_description} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Product Image" name="product_image" value={formData.product_image} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SelectField label="Status" name="status" value={formData.status} onChange={handleSelectChange} options={statuses} />
                    </Grid>
                </Grid>
            </Box>
      </Dialog>
    </React.Fragment>
  );
}
