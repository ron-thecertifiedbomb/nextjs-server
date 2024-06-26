import React from 'react';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  description: string;
  image: string;
  phone: string;

}

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>Name: {user.name}</h2>
      <p>Description: {user.description}</p>
      <Image
        src={user.image}
        width={600}
        height={500}
        alt="User Image"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export default Card;
