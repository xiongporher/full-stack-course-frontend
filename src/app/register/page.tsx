"use client";

import UserServices from "@/services/userServices";
import { CreateUser } from "@/types/userType";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaLock,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";

const RegisterPage = () => {
  const userServices = new UserServices();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<CreateUser>({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    password: "", // Adjust based on your `User` interface
  });

  const handleShowHidePw = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const goToSignUp = () => {
    router.push("/login");
  };

  const handRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault(); // Prevent the default form submission
      setIsLoading(true);
      const result: any = await userServices.userRegister(
        formData as CreateUser
      );
      console.log({ result });
      goToSignUp();
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handRegisterUser}>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white w-2/3 shadow-lg flex rounded-xl">
          {/* Left Side */}
          <div className="w-1/2 bg-teal-500 p-6 text-white hidden md:flex flex-col justify-center items-center">
            <h2 className="text-3xl mb-4 font-bold text-center">
              Welcome Back!
            </h2>
            <p className="mb-6 text-center">
              To keep connected with us please login with your personal info
            </p>
            <Button
              className="bg-white text-teal-500 px-8 rounded-full"
              onClick={goToSignUp}
            >
              Sign In
            </Button>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-teal-500 text-2xl font-semibold mb-6 text-center">
              Create Account
            </h2>

            <div className="flex justify-center space-x-3 mb-4">
              <div className="bg-gray-200 rounded-full p-2">
                <FaFacebookF className="text-teal-500" />
              </div>
              <div className="bg-gray-200 rounded-full p-2">
                <FaGoogle className="text-teal-500" />
              </div>
              <div className="bg-gray-200 rounded-full p-2">
                <FaLinkedinIn className="text-teal-500" />
              </div>
            </div>

            <p className="text-gray-500 text-center mb-4">
              or use your email for registration:
            </p>

            {/* Form fields */}
            <div className="space-y-4">
              <div className="max-w-md">
                <TextInput
                  id="firstname"
                  type="text"
                  icon={IoMdPerson}
                  placeholder="firstname"
                  value={formData?.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="max-w-md">
                <TextInput
                  id="lastname"
                  type="text"
                  icon={IoMdPerson}
                  placeholder="lastname"
                  value={formData?.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="max-w-md">
                <TextInput
                  id="email"
                  type="email"
                  icon={HiMail}
                  placeholder="example@gmail.com"
                  value={formData?.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="max-w-md">
                <TextInput
                  id="dob"
                  type="date"
                  value={formData?.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="max-w-md">
                <TextInput
                  onChange={handleChange}
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
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 items-center"
              >
                {isLoading && (
                  <Spinner aria-label="" size="sm" className="mr-1" />
                )}{" "}
                <span>Sign Up</span>
              </Button>
              <Button
                onClick={goToSignUp}
                className="w-full md:hidden text-teal-800 hover:text-white rounded-full px-5 border- bg-transform"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
