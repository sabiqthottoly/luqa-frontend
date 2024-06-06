import React from 'react';
import TextField from '@mui/material/TextField';

interface InputFieldProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
    />
  );
};

export default InputField;
