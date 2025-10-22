'use client'

import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/lib/api";

export default function Users() {
  const {
    data, 
    error, 
    isPending} = useQuery({
      queryKey: ['users'],
      queryFn: getUsers,
  })

  console.log(data)

  return (
    <section className="flex flex-col items-center content-center w-full h-full">
      <h1 className="text-2xl mb-4 font-semibold">Users</h1>
      <ul className="flex flex-col gap-2">
        {data?.map(user => (
          <li key={user.id} className="border p-2 rounded shadow-sm">
            <p className="font-medium">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}