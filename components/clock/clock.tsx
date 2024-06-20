import React, { useState, useEffect } from "react";

const TimeComponent: React.FC = () => {
  
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const formattedTime: string = currentTime.toLocaleTimeString();

  return (
    <>
      <h2>{formattedTime}</h2>
    </>
  );
};

export default TimeComponent;
