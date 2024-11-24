"use client";

import React, { useState, useEffect } from "react";
import { Button, TextInput, Label, Spinner } from "flowbite-react";
import UserServices from "@/services/userServices";
import { User } from "@/types/userType";
import { FaEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const UserProfileForm = () => {
  const userServices = new UserServices();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<User | null>({
    firstname: "",
    lastname: "",
    email: "",
    dob: new Date().toISOString(), // Set to current date as an ISO string
    profile: "", // Adjust based on your `User` interface
  });
  const [userData, setUserData] = useState<User | any>();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const result: User | any = await userServices.loadUserProfile();
        if (result?.message === "jwt expired") {
          const refreshTokenResult: any = await userServices.userRefreshToken();
          localStorage.setItem("token", refreshTokenResult?.token);
          localStorage.setItem(
            "refreshToken",
            refreshTokenResult?.refreshToken
          );

          fetchUserData();
        }

        setFormData(result);
        setUserData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!isEdit) setFormData(userData);
  }, [isEdit]);

  const handleProfileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isEdit) return;

    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "full-stack-course"); // Replace with your Cloudinary unsigned preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dnlwnjz3w/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        const updatedData: any = { ...formData, profile: data.secure_url };
        setFormData(updatedData);
        console.log("Uploaded to Cloudinary:", data.secure_url);
      } else {
        console.error("Failed to upload image to Cloudinary:", data);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isEdit) return;
    const { id, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEditAndCancel = () => {
    setIsEdit(!isEdit);
  };

  const handUpdateUser = async () => {
    try {
      setIsEditing(true);
      const result: any = await userServices.updateUser(formData as User);
      console.log({ result });

      if (result?.message === "jwt expired") {
        const refreshTokenResult: any = await userServices.userRefreshToken();
        localStorage.setItem("token", refreshTokenResult?.token);
        localStorage.setItem("refreshToken", refreshTokenResult?.refreshToken);

        handUpdateUser();
      }

      setUserData(result);
      setFormData(result);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsEditing(false);
      setIsEdit(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Spinner className="text-10xl" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <form>
      <div className="bg-gray-100">
        <div className="md:max-w-xl max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg h-screen">
          <div className="flex justify-between items-center mb-6 ">
            <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
            {!isEdit ? (
              <Button
                onClick={handleEditAndCancel}
                className="p-0 border-none rounded-full items-center"
                color="light"
              >
                <FaEdit className="text-2xl text-teal-600" />
              </Button>
            ) : (
              <Button
                onClick={handleEditAndCancel}
                className="p-0 border-none rounded-full items-center"
                color="light"
              >
                <ImCancelCircle className="text-2xl text-red-600" />
              </Button>
            )}
          </div>
          <form className="space-y-6">
            {/* Profile profile */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 border rounded-full overflow-hidden bg-gray-100 mb-4">
                <Label htmlFor="profile-upload" className="cursor-pointer">
                  {formData?.profile ? (
                    <img
                      src={formData?.profile as string}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Upload
                    </div>
                  )}
                </Label>
              </div>
              <input
                type="file"
                id={isEdit ? "profile-upload" : ""}
                accept="image/*"
                className="hidden"
                onChange={handleProfileUpload}
              />
            </div>

            {/* First Name */}
            <div>
              <Label htmlFor="firstname" value="First Name" />
              <TextInput
                id="firstname"
                type="text"
                value={formData?.firstname}
                onChange={handleChange}
                placeholder="firstname"
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastname" value="Last Name" />
              <TextInput
                id="lastname"
                type="text"
                value={formData?.lastname}
                onChange={handleChange}
                placeholder="lastname"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder="example@example.com"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dob" value="Date of Birth" />
              <TextInput
                id="dob"
                type="date"
                value={formData?.dob}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            {isEdit && (
              <Button
                onClick={handUpdateUser}
                className="w-full bg-teal-500 text-white"
              >
                {isEditing && (
                  <Spinner aria-label="" size="sm" className="mr-1" />
                )}
                <span>Save Changes</span>
              </Button>
            )}
          </form>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;
