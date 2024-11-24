"use client";

import UseMemoComponent from "@/components/UseMemoComponent";
import { Button } from "flowbite-react";
import { useState } from "react";

const UseMemoPage = () => {
  const [factorial, setFactorial] = useState(1);
  return (
    <div>
      <UseMemoComponent num={factorial} />
      <Button
        color="blue"
        onClick={() => setFactorial(factorial + 1)}
        className="p-2"
      >
        Add new
      </Button>
    </div>
  );
};

export default UseMemoPage;
