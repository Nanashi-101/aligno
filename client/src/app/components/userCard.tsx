import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

function UserCard({ user }: Props) {
  return (
    <div className="flex items-center rounded border shadow p-4">
      {user.profilePictureUrl && (
        <Image
          src={`/p1.jpg`}
          alt={`${user.name}'s avatar`}
          width={32}
          height={32}
          className="rounded-full mr-4"
        />
      )}
      <div>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-600">Email: {user.email}</p>
      </div>
    </div>
  );
}

export default UserCard;
