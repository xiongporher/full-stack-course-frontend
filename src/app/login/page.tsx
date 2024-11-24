"use client";

import UserServices from "@/services/userServices";
import { Button, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaFacebookF,
  FaGoogle,
  FaGithub,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginPage = () => {
  const userServices = new UserServices();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleShowHidePw = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const result: any = await userServices.login({ email, password });
    console.log("====", { result });

    if (result?.statusCode != 200 && result?.statusCode)
      return setMessage(result?.message);

    localStorage.setItem("token", result?.token);
    localStorage.setItem("refreshToken", result?.refreshToken);

    router.push("/profile");
  };

  return (
    <div className="h-screen bg-gray-300 flex justify-center items-center">
      <div className="w-5/6 lg:w-2/3 xl:w-1/2 h-2/3 bg-white flex justify-center items-center rounded-md">
        {/* Left side */}
        <div className="w-4/5 sm:w-2/3 md:w-1/2 flex flex-col justify-center items-center space-y-4 p-4">
          <h1 className="text-teal-500 text-2xl font-bold text-center">
            Login in to orkard tech system
          </h1>
          <div className="w-full flex justify-center space-x-2">
            <p className="bg-gray-300 p-2 rounded-full">
              <FaFacebookF className="text-teal-500" />
            </p>
            <p className="bg-gray-300 p-2 rounded-full">
              <FaGoogle className="text-teal-500" />
            </p>
            <p className="bg-gray-300 p-2 rounded-full">
              <FaGithub className="text-teal-500" />
            </p>
          </div>
          <p className="text-gray-400">or use your email account</p>
          <TextInput
            onChange={(e: any) => setEmail(e.target.value)}
            className="w-full"
            id="email"
            type="email"
            icon={MdEmail}
            placeholder="example@gmail.com"
            required
          />
          <TextInput
            onChange={(e: any) => setPassword(e.target.value)}
            className="w-full"
            id="password"
            type={showPassword ? "text" : "password"}
            icon={FaLock}
            rightIcon={() =>
              !showPassword ? (
                <FaEye
                  onClick={handleShowHidePw}
                  className="cursor-pointer"
                  fontSize={12}
                  width={16}
                />
              ) : (
                <FaEyeSlash
                  onClick={handleShowHidePw}
                  className="cursor-pointer"
                />
              )
            }
            placeholder="password"
            required
          />
          {message && (
            <p className="text-red-400 w-full text-left">{message}</p>
          )}
          <Button
            type="submit"
            onClick={handleLogin}
            className="w-2/3 bg-teal-500 rounded-full"
          >
            Sign in
          </Button>
          <Button
            onClick={() => router.push("register")}
            className="w-2/3 md:hidden text-teal-500 rounded-full px-5 border- bg-transform"
          >
            SIGN UP
          </Button>
        </div>

        {/* Right side */}
        <div className="hidden md:flex justify-center bg-teal-500 w-1/2 h-full ">
          <div className="h-full flex flex-col justify-center items-center space-y-3 p-4">
            <h1 className="text-white text-3xl font-bold">Hello, friend!</h1>
            <p className="text-gray-200 text-center">
              Enter your personal details and start to join us!.
            </p>
            <Button
              onClick={() => router.push("register")}
              className="text-white rounded-full px-5 border- bg-transform"
            >
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
