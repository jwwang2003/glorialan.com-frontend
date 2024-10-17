"use client";

import { useEffect } from "react";

import { login } from "@/serverActions/authentication";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function Login() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  useEffect(() => {
    // if (errorMessage.errors?.username)
    //   toast.error(errorMessage.errors?.username[0], { position: "top-center"});
    // if (errorMessage.errors?.password)
    //   toast.error(errorMessage.errors?.password[0], { position: "top-center" });
    // errorMessage?.errors;
    // errorMessage?.message;
  }, [errorMessage]);

  return (
    <div className="flex justify-center items-center w-full">
      <form action={dispatch}>
        <div className="flex flex-col gap-2">
          <input
            type="username"
            name="username"
            placeholder="Username"
            required
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          ></input>
          <button type="submit" className="w-full">
            Login
          </button>

          <Link href="/register">
            <button className="w-full">Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
