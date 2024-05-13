import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const CoffeeForm = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <TextField
        fullWidth
        label="Name"
        {...register('name')}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        {...register('description')}
      />
      <TextField
        fullWidth
        label="Roasted"
        {...register('roasted')}
      />
      <TextField
        fullWidth
        label="Ingredients"
        {...register('ingredients')}
      />
      <TextField
        fullWidth
        label="Special Ingredient"
        {...register('special_ingredient')}
      />
      {['S', 'M', 'L'].map((size, index) => (
        <TextField
          key={index}
          fullWidth
          label={`Price (${size})`}
          {...register(`prices[${index}].price`)}
        />
      ))}
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          {...register('type')}
        >
          <MenuItem value="Coffee">Coffee</MenuItem>
          <MenuItem value="Tea">Tea</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Checkbox color="primary" {...register('favourite')} />}
        label="Favourite"
      />
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default CoffeeForm;
