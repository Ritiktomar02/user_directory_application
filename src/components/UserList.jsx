
import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users, onView, onEdit, onDelete }) => {
  if (!users.length) {
    return (
      <p className="text-center text-gray-500">
        No users found matching your search.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default UserList;



