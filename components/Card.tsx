import React from 'react';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>{user.firstname} {user.lastname}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}

export default Card;
