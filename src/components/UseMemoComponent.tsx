import { useMemo } from "react";

const UseMemoComponent = ({ num }: { num: number }) => {
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };
  const computedFactorial = useMemo(() => factorial(num), [num]);
  return (
    <p>
      Factorial of {num}! is: {computedFactorial}
    </p>
  );
};
export default UseMemoComponent;
