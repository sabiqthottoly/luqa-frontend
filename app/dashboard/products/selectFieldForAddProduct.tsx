import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SelectFieldProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: SelectChangeEvent) => void;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, options }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}  name={name}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
