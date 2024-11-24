"use client";

import { useState, useCallback } from "react";

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(() => setCount(count + 1), [count]);

  return (
    <div>
      {" "}
      <p>Count: {count}</p>{" "}
      <button onClick={increment} className="bg-blue-600 p-2 rounded text-white">
        Increment
      </button>{" "}
    </div>
  );
};
export default UseCallbackExample;
