import { UserType } from "@/Types";

export default function UserCard({ user }: { user: UserType | undefined }) {
  return (
    <>{
      user ?
        <div className="p-4 gap-2 bg-white text-black">
          <div className="font-bold">Name</div>
          <div className="font-light">{user.name}</div>

          <div className="font-bold">UUID</div>
          <div className="font-light">{user.uuid}</div>

          <div className="font-bold">Username</div>
          <div className="font-light">{user.username}</div>

          <div className="font-bold">{'Role(s)'}</div>
          <div className="font-light">{user.role}</div>

          <div className="font-bold">Special Privledges</div>
          <div className="font-light">{user.special_privledges}</div>
        </div>
        :
        <div>{'User is not defined'}</div>
    }</>
  )
}