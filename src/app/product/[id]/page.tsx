"use client";
import { useParams } from "next/navigation";

const ProductPage: React.FC = () => {
  const params: any = useParams();
  const { id } = params;
  return <h1>Product ID: {id}</h1>;
};
export default ProductPage;

// let greeter = 'say hi'
// let times = 4;
// if(times>3){
//    greeter = 'hello'
// }

// console.log(greeter) // hello
