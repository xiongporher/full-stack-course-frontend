"use client";
import { store } from "@/store/store";
// import { useRouter } from "next/navigation";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  // const router = useRouter();

  // const token = localStorage.getItem("token");
  // if (!token) router.push("login");
  return (
    <Provider store={store}>
      <body>{children}</body>
    </Provider>
  );
}
