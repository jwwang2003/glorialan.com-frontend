"use server"

import { cookies } from 'next/headers';

// import { connectToMongoDB } from "@/lib/mongodb";

import { z } from 'zod';
import { CompareHashedPassword, CreateUser, HashPassword } from "@/lib/auth";
import { redirect } from "next/navigation";
import axios from 'axios';

enum STATE {
  SUCESS,   // authentication success
  WRONGCRED,  // wrong credentials

  VALIDATIONERROR,
  USERTAKEN,
}

const AUTH_SCHEMA = z.object({
  username: z.string({
    required_error: "Username cannot be empty",
    invalid_type_error: "Invalid username",
  }).min(1),
  password: z.string({
    required_error: "Password cannot be empty",
  }).min(1)
})

export async function register(_currentState: any, formData: FormData) {
  const validatedFields = AUTH_SCHEMA.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: STATE.VALIDATIONERROR,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = { ...validatedFields.data };

  // first establish a DB connection
  // const { database } = await connectToMongoDB();

  // if (!database || !process.env.NEXT_ATLAS_USERS_COLLECTION) {
  //   console.log('db error')
  //   return {};
  // }

  // const collection = database!.collection(process.env.NEXT_ATLAS_USERS_COLLECTION);

  // const user_query = await collection.find({
  //   username
  // })

  // const user = await user_query.toArray();

  // if (!user.length) {
  //   // user DNE (does not exist)
  //   const hashedPassword = await HashPassword(password);
  //   await collection.insertOne(CreateUser(username, hashedPassword));
  // } else {
  //   return {
  //     message: STATE.USERTAKEN
  //   }
  // }

  redirect('/login');

  // return {
  //   message: STATE.SUCESS
  // }
}

export async function login(_currentState: any, formData: FormData) {
  const validatedFields = AUTH_SCHEMA.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: STATE.VALIDATIONERROR,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = { ...validatedFields.data };
  console.log(JSON.stringify({username, password}))
  axios({
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    method: "GET",
    url: "",
    baseURL: "http://backend:8000/auth/login",
    data: JSON.stringify({ username, password })
  }).then(res => {
    console.log(res.data);
  }).catch(err => {
    console.log(err);
  })

  // console.log(res.data);

  // const { database } = awadockt connectToMongoDB();

  // if (!database || !process.env.NEXT_ATLAS_USERS_COLLECTION) {
  //   return {};
  // }

  // const collection = database!.collection(process.env.NEXT_ATLAS_USERS_COLLECTION);

  // const user_query = await collection.find({
  //   username
  // });

  // const user = await user_query.toArray();

  // if (user.length == 0) return {
  //   message: STATE.WRONGCRED,
  // }
  // else {
  //   // const hashedPassword = await HashPassword(password);
  //   const check = await CompareHashedPassword(password, user[0].password);
  //   if (check) {
  //     cookies().set('session', username, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       maxAge: 60 * 60 * 24 * 7, // One week
  //       path: '/',
  //     });
  //     redirect("/");
  //   } else {
  //     return {
  //       message: STATE.WRONGCRED
  //     }
  //   }
  // }
}