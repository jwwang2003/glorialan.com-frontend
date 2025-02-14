import { headers } from 'next/headers';
import { apiRequest } from "@/lib/api";

import type { UserType } from "@/Types";
import UserCard from '@/components/UserCard';
import Button from '@/_components/UI/Button';

export default async function Profile() {
  const cookieHeader = headers().get('cookie') || '';

  const userData = await apiRequest<UserType>(
    "/auth/retrieve_cookie",
    {
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      method: "GET",
    }
  );

  return (
    <div className="w-fit">
        <dl className="divider">
          <div className="px-4 py-4 sm:px-0">
            <h3 className="text-base/7 font-semibold">Profile</h3>
            <p className="mt-1 max-w-2xl text-sm/6 font-light">{'Account details & other info. (for debugging)'}</p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium 0">User Profile</dt>
            <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
              <UserCard user={userData.data} />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium">Edit User Profile</dt>
            <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0"><Button theme="white">Edit</Button></dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium">User Logout</dt>
            <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
             <a href="/logout"><Button theme="red">Logout</Button></a>
            </dd>
          </div>
        </dl>
    </div>
  )
}

export const dynamic = 'force-dynamic';