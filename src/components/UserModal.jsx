import React from "react";
import { useEffect } from "react";

const UserModal = ({ user, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-2">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p><b>Company:</b> {user.company?.name}</p>
        <p><b>Website:</b> {user.website}</p>
        <p>
          <b>Address:</b> {user.address?.street}, {user.address?.city}
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserModal;



