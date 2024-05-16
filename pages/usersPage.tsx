import React, { useEffect, useState } from 'react';
import Card from '../components/Card';


interface User {
  id: number;
  name: string;
  description: string;
  image: string;
  phone: string;
  // Add more properties if necessary
}

async function getData(): Promise<User[]> {
  
  const res = await fetch('/api/getAllUsers');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
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
