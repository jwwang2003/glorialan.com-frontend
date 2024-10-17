"use client";

import { useEffect } from "react";

import { register } from "@/serverActions/authentication";
import { useFormState } from "react-dom";

export default function Login() {
  const [errorMessage, dispatch] = useFormState(register, undefined);

  useEffect(() => {
    // if (errorMessage.errors?.username)
    //   toast.error(errorMessage.errors?.username[0], { position: "top-center"});
    // if (errorMessage.errors?.password)
    //   toast.error(errorMessage.errors?.password[0], { position: "top-center" });
  }, [errorMessage])

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
          <p aria-live="polite" className="sr-only">
            {/* {JSON.stringify(errorMessage.errors)} */}
          </p>
          <button type="submit" className="w-full">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
