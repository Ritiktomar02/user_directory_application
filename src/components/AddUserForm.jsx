import React from "react";
import { useEffect, useState } from "react";
import { validateEmail } from "../utils/validation";

const AddUserForm = ({ users, onAdd, onUpdate, editingUser }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  // Prefill form when editing
  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
      });
    } else {
      setForm({ name: "", email: "", phone: "" });
    }
  }, [editingUser]);

  const isFormValid =
    form.name && validateEmail(form.email) && form.phone;

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};

    if (!form.name) err.name = "Name is required";
    if (!validateEmail(form.email))
      err.email = "Valid email required";
    if (!form.phone) err.phone = "Phone is required";

    // Duplicate email check
    if (
      users.some(
        (u) =>
          u.email === form.email &&
          u.id !== editingUser?.id
      )
    ) {
      err.email = "Email already exists";
    }

    // Duplicate phone check
    if (
      users.some(
        (u) =>
          u.phone === form.phone &&
          u.id !== editingUser?.id
      )
    ) {
      err.phone = "Phone number already exists";
    }

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    if (editingUser) {
      onUpdate({ ...editingUser, ...form });
    } else {
      onAdd({
        id: Date.now(),
        ...form,
        address: { street: "N/A", city: "N/A" },
        company: { name: "N/A" },
        website: "N/A",
      });
    }

    setForm({ name: "", email: "", phone: "" });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-4 rounded shadow space-y-3
        ${editingUser ? "border-2 border-yellow-400" : ""}`}
    >
      <h3 className="font-semibold text-lg">
        {editingUser ? "Edit User" : "Add New User"}
      </h3>

      {editingUser && (
        <p className="text-sm text-yellow-600">
          You are editing an existing user
        </p>
      )}

      <input
        placeholder="Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name}</p>
      )}

      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>
      )}

      <input
        placeholder="Phone"
        className="w-full border p-2 rounded"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone}</p>
      )}

      <div className="flex gap-2">
        <button
          disabled={!isFormValid}
          className="flex-1 bg-green-600 text-white py-2 rounded
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>

        {editingUser && (
          <button
            type="button"
            onClick={() => onUpdate(null)}
            className="flex-1 bg-gray-400 text-white py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddUserForm;
