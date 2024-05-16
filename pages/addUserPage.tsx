import React, { useCallback } from 'react';
import AddForm from '../components/AddForm';

const AddUserPage = () => {

  const handleSubmit = useCallback(async (userData) => {
    try {
      const response = await fetch('/api/addNewData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const data = await response.json();
      console.log('User added successfully:', data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 500, padding: 20, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 8 }}>
        <h1>Add New User</h1>
        <AddForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddUserPage;
