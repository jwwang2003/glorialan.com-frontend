"use client";

import { Suspense, useEffect } from "react";

import { login } from "@/serverActions/authentication";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { STATE } from "@/Types";

export type State = {
  errors?: any,
  message?: string | null;
}

function Login() {
  const searchParams = useSearchParams();
  const [response, dispatch] = useFormState(login, undefined);

  // Read the redirect param from the query string
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (!response) return;

    switch(response.message) {
      case STATE.WRONGCRED: {
        toast.error("Authentication failure", { position: "top-center"});
        break;
      }
      case STATE.VALIDATIONERROR:
      {
        toast.error(`Validation error${JSON.stringify(response.errors)}`, { position: "top-center"});
      }
    }
  }, [response]);

  return (
    <div className="flex justify-center items-center w-full">
      <form action={dispatch}>
        <input readOnly name="redirect" className="hidden" value={redirect || ""} />
        <div className="flex flex-col gap-2">
          <input
            type="username"
            name="username"
            placeholder="Username"
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
          ></input>
          <button type="submit" className="w-full">
            Login
          </button>
          
          {/* <Link href="/register">
            <button className="w-full">Register</button>
          </Link> */}
        </div>
      </form>
    </div>
)
}

export default function LoginWrapper() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
