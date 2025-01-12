import { headers } from 'next/headers';
import { apiRequest } from "@/lib/api";

export default async function Profile() {
  const cookieHeader = headers().get('cookie') || '';

  const userData = await apiRequest<{
    uuid: string,
    name: string,
    username: string,
    role: number[],
    special_privledges: string[]
  }>(
    "auth/retrieve_cookie",
    {
      headers: {
        cookie: cookieHeader,
      },
      method: "GET",
    }
  );

  return (
    <div className="p-4">
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Profile</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">User Profile</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {
              userData.data ?
                <div className="flex flex-col gap-2 bg-white text-black p-4 rounded-md shadow-lg">
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-md">{ userData.data.name }</p>
                  </div>
                  <div className="flex flex-col justify-centerr">
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-md">{ userData.data.uuid }</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="text-md">{ userData.data.username }</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">Roles</p>
                    <p className="text-md">{ userData.data.role }</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">Special Privledges</p>
                    <p className="text-md">{ userData.data.special_privledges }</p>
                  </div>
                  {/* Profile */}
                </div>
                :
                <>
                { "User is undefined." }
                </>
              }
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Edit User Profile</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"><button><a href="/logout">Edit</a></button></dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">User Logout</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
             <a href="/logout"> <button className="bg-red-500">Logout</button></a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'