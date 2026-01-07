import React from "react";

const UserCard = ({ user, onView, onEdit, onDelete }) => {
  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/40 
                    rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800">
        {user.name}
      </h3>

      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-600">{user.phone}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onView(user)}
          className="flex-1 text-sm py-1.5 rounded-lg 
                     bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          View
        </button>

        <button
          onClick={() => onEdit(user)}
          className="flex-1 text-sm py-1.5 rounded-lg 
                     bg-yellow-500 text-white hover:bg-yellow-600 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(user.id)}
          className="flex-1 text-sm py-1.5 rounded-lg 
                     bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;



