import { CreateUser, User } from "@/types/userType";
import { useRouter } from "next/navigation";

interface LoginResponse {
  token: string;
  refreshToken: string;
}

class UserServices {
  router = useRouter();

  login = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse | null> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email,
      password,
    });

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let loginResult: any = {};

    loginResult = fetch(
      // "http://localhost:4000/api/v1/users/login",
      "http:192.168.33.248:4000/api/v1/users/login",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((error) => console.log("error", error));

    return loginResult;
  };

  loadUserProfile = async (): Promise<User | null> => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      console.error("Token not found in localStorage");
      return null; // Return null if the token is missing
    }

    try {
      const response = await fetch(
        // "http://192.168.100.29:4000/api/v1/users/profile",
        "http:192.168.33.248:4000/api/v1/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data: User = await response.json();
      return {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      };
    } catch (error) {
      console.error("Failed to load user profile:", error);
      throw error; // Return null in case of an error
    }
  };

  updateUser = async (user: User): Promise<User> => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await fetch(
        // "http://192.168.100.29:4000/api/v1/users/update/profile",
        "http:192.168.33.248:4000/api/v1/users/update/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data: User = await response.json();
      return {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  userRegister = async (user: CreateUser): Promise<User> => {
    try {
      const response = await fetch(
        // "http://192.168.100.29:4000/api/v1/users/create",
        "http:192.168.33.248:4000/api/v1/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...user, profile: "" }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: User = await response.json();
      return {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  userRefreshToken = async (): Promise<LoginResponse | null> => {
    const refreshToken = localStorage.getItem("refreshToken");

    const response: any = await fetch(
      // "http://192.168.100.29:4000/api/v1/users/refresh/token",
      "http://192.168.33.248:4000/api/v1/users/refresh/token",
      {
        method: "PUT",
        headers: {
          "refresh-token": `${refreshToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    console.log({ response });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result?.message === "jwt expired") {
      localStorage.clear();
      this.router.push("login");
    }
    return result;
  };
}

export default UserServices;
