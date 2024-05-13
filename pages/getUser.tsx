import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  // Add more properties if necessary
}

async function getData(): Promise<User[]> {
  
  const res = await fetch('/api/getUser');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

function Card({ user }: { user: User }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>{user.firstname} {user.lastname}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}

function Page() {
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      {error && <div>Error: {error.message}</div>}
      {data && data.map(user => <Card key={user.id} user={user} />)}
    </main>
  );
}

export default Page;
