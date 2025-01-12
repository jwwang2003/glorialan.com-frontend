"use server"

import { cookies } from 'next/headers';
import { parse } from 'cookie';

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
  redirect_path: z.string().optional(),
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
    redirect_path: formData.get('redirect'),
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

  const { redirect_path, username, password } = { ...validatedFields.data };

  let result;
  try {
    result = await axios({
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      method: "POST",
      url: "",
      baseURL: "http://backend:8000/auth/login",
      data: JSON.stringify({ username, password })
    });
  } catch (e) {
      return {
        message: STATE.WRONGCRED
      };
  }

  if (result) {
    console.log(result.data);
  }

  if (result.status === 200) {
    // 2. Capture the 'Set-Cookie' header from the backend
    // Note that fetch returns headers in a case-insensitive map
    const setCookieHeader = result.headers.get('set-cookie');

    // 3. If the backend sets cookies, forward them to the client
    if (setCookieHeader) {
      // You can set multiple cookies if needed.
      // Sometimes backends return multiple Set-Cookie headers,
      // in which case you'd parse them individually.
      // For simplicity, assume it's just one.
      
      const parsed = parse(setCookieHeader[0]);
      // console.log(setCookieHeader, parsed);
      // cookies().set('Set-Cookie', setCookieHeader);
      Object.entries(parsed).forEach(([name, value]) => {
        // console.log(name, value);
        cookies().set(name, value, {
          path: '/',           // or your desired path
          httpOnly: true,      // if you want it inaccessible to JS
          secure: true,     // typically 'true' in production over HTTPS
          sameSite: 'none', // often needed if crossing domains
          // domain: 'localhost:8000',    // if you need a specific domain
        });
      });
      // Depending on your needs, you might want to manipulate
      // the cookie attributes (domain, path, etc.), or replicate them as-is.
      redirect(redirect_path || "/");
    }
    return 
  } else {
    return {
      message: STATE.WRONGCRED
    };
  }

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