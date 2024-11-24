"use client";

import { useState, useEffect } from "react";

const UseEffectExample = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [time]); // Depend on `time`

  const getProducts = () => {};
  useEffect(() => {
    getProducts();
  }, []); // work only time when access this page
  useEffect(() => {}, [time]); // work every time when time has change example: time = 0, 1, 2

  return <p>Timer: {time} seconds</p>;
};

export default UseEffectExample;
