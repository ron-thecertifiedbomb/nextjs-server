import React from 'react';
import CoffeeForm from '../components/CoffeeForm';
import ReactHookCoffeeForm from '../components/CoffeeReactHookForm'

const CreateCoffeePage = () => {
  
  const handleSubmit = async (coffeeData) => {
    try {
      const response = await fetch('/api/addNewData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coffeeData),
      });
      if (!response.ok) {
        throw new Error('Failed to add coffee');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding coffee:', error);
    }
  };

  return (
    <div>
      <h1>Create New Coffee</h1>
      <CoffeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCoffeePage;
