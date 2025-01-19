"use server"

import { cookies } from 'next/headers';
import { parse } from 'cookie';

import { z } from 'zod';
import { redirect } from "next/navigation";
import { apiRequest } from '@/lib/api';
import { STATE } from '@/Types';
import { getBaseHostname } from '@/_lib/environment';

const AUTH_SCHEMA = z.object({
  redirect_path: z.string(),
  username: z.string({
    required_error: "Username cannot be empty",
    invalid_type_error: "Invalid username",
  }).min(1),
  password: z.string({
    required_error: "Password cannot be empty",
  }).min(8)
});

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
  const result = await apiRequest<{}>(
    "/auth/login",
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ username, password })
    }
  );

  if (result.status === 200) {
    // 2. Capture the 'Set-Cookie' header from the backend
    // Note that fetch returns headers in a case-insensitive map
    const headers = result.response?.headers;

    let setCookieHeader;
    if (headers) {
      setCookieHeader = headers.getSetCookie();
    }

    // 3. If the backend sets cookies, forward them to the client
    if (setCookieHeader) {
      // You can set multiple cookies if needed.
      // Sometimes backends return multiple Set-Cookie headers,
      // in which case you'd parse them individually.
      // For simplicity, assume it's just one.
      const parsed = parse(setCookieHeader[0]);
      console.log(parsed);
      Object.entries(parsed).forEach(([name, value]) => {
        if (value) {
          cookies().set(name, value, {
            path: '/',            // or your desired path
            httpOnly: true,       // if you want it inaccessible to JS
            secure: true,         // typically 'true' in production over HTTPS
            sameSite: 'none',     // often needed if crossing domains
            // domain: 'localhost:',    // if you need a specific domain
          });
        }
      });
      // Depending on your needs, you might want to manipulate
      // the cookie attributes (domain, path, etc.), or replicate them as-is.
      // if (redirect_path)
      //   redirect(new URL(redirect_path, getBaseHostname()).toString());
      // else
      //   redirect(getBaseHostname());
      redirect(new URL(redirect_path, getBaseHostname()).toString());
    }
    return 
  } else {
    return {
      message: STATE.WRONGCRED,
      errors: undefined
    }
  }
}