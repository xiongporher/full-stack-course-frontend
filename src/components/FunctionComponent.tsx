// import Button from "./Button";

import { Button } from "flowbite-react";

// components/FunctionComponent.tsx
const FunctionComponent: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div>
      <h1 className="example-global-css">{message}</h1>
      <div className="bg-blue-100 text-red-500 p-4">{message}</div>
      {/* <Button label="Function button" /> */}
      <Button color="blue">Flobite button</Button>
    </div>
  );
};

export default FunctionComponent;
