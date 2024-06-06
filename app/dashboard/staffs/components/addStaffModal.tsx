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
import InputField from './inputFieldForAddStaff';
import SelectField from './selectFieldForAddStaff';
import { Box, Grid, SelectChangeEvent } from '@mui/material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AddStaffModalProps {
    open: boolean;
    handleClose: () => void;
}

const roles = ["Admin", "Manager", "Staff"];
const designations = ["Developer", "Designer", "Product Manager"];
const statuses = ["Active", "Inactive"];

const AddStaffModal: React.FC<AddStaffModalProps> = ({ open, handleClose }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        branch: '',
        department: '',
        designation: '',
        role: '',
        location: '',
        status: '',
        password: '',
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

    return (
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
                        Staff Details
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
                        <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Branch" name="branch" value={formData.branch} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Department" name="department" value={formData.department} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SelectField label="Designation" name="designation" value={formData.designation} onChange={handleSelectChange} options={designations} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SelectField label="Role" name="role" value={formData.role} onChange={handleSelectChange} options={roles} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SelectField label="Status" name="status" value={formData.status} onChange={handleSelectChange} options={statuses} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputField label="Password" name="password" value={formData.password} onChange={handleChange} />
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
}


export default AddStaffModal;
