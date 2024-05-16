import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const CoffeeForm = ({ onSubmit }) => {

  const [coffee, setCoffee] = useState({
    name: '',
    description: '',
    roasted: '',
    ingredients: '',
    special_ingredient: '',
    prices: [
      { size: 'S', currency: '$' },
      { size: 'M', currency: '$' },
      { size: 'L', currency: '$' },
    ],
    type: '',
    favourite: false,
  });

  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCoffee((prevCoffee) => ({
      ...prevCoffee,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(coffee);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <TextField
        fullWidth
        name="name"
        label="Name"
        value={coffee.name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        name="description"
        label="Description"
        value={coffee.description}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        name="roasted"
        label="Roasted"
        value={coffee.roasted}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        name="ingredients"
        label="Ingredients"
        value={coffee.ingredients}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        name="special_ingredient"
        label="Special Ingredient"
        value={coffee.special_ingredient}
        onChange={handleChange}
      />
      {coffee.prices.map((price, index) => (
        <TextField
          key={index}
          fullWidth
          name={`price-${index}`}
          label={`Price (${price.size})`}
          onChange={handleChange}
        />
      ))}
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={coffee.type}
          onChange={handleChange}
        >
          <MenuItem value="Coffee">Coffee</MenuItem>
          <MenuItem value="Tea">Tea</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Checkbox color="primary" name="favourite" checked={coffee.favourite} onChange={handleChange} />}
        label="Favourite"
      />
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default CoffeeForm;
