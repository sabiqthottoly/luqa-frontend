
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const categories = [
  {
    name: 'Lead',
    permissions: ['Lead Dashboard', 'Lead Data', 'Assign Lead'],
  },
  {
    name: 'Work',
    permissions: ['Work Dashboard', 'Work Data', 'Assign Work'],
  },
  {
    name: 'Job',
    permissions: ['Job Dashboard', 'Job Data', 'Assign Job'],
  },
  {
    name: 'Follow up',
    permissions: ['Follow-up Dashboard', 'Follow-up Data', 'Assign Follow-up'],
  },
];

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (category, permission) => {
    setChecked((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: !prev[category]?.[permission],
      },
    }));
  };

  const handleReset = () => {
    setChecked({});
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Add roles
      </Button> */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Role
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
              Add Role
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
            <Button color="inherit" onClick={handleReset}>
              Reset
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ p: 5 }}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              placeholder="Enter name"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Permissions</Typography>
          </Grid>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name} sx={{ p: 2 }}>
              <Typography variant="h6">{category.name}</Typography>
              {category.permissions.map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={
                    <Checkbox
                      checked={
                        checked[category.name]?.[permission] || false
                      }
                      onChange={() =>
                        handleCheckboxChange(category.name, permission)
                      }
                    />
                  }
                  label={permission}
                  sx={{ display: 'block', mb: 1 }}
                />
              ))}
            </Grid>
          ))}
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}

