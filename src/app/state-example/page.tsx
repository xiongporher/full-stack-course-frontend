"use client";

// app/state-example/page.tsx
import { useState } from "react";
const StateExample = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        onClick={increment}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Increment
      </button>
    </div>
  );
};

export default StateExample;
