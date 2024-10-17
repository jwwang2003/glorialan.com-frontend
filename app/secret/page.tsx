"use client"

import FileUpload from "@/components/FlieUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function Secret() {
  const router = useRouter();

  return (
    <>
      <FileUpload accept="image/jpeg, image/png"/>

      <button onClick={ () =>  { router.push('/logout'); router.refresh(); } }>Logout</button>
    </>
  )
}