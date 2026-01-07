import React from "react";
import { useState } from "react";
import { validateEmail } from "../utils/validation";

const AddUserForm = ({ users, editingUser, onAdd, onUpdate }) => {
  const [form, setForm] = useState(() => ({
    name: editingUser?.name || "",
    email: editingUser?.email || "",
    phone: editingUser?.phone || "",
  }));

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};

    if (!form.name) err.name = "Name is required";
    if (!validateEmail(form.email)) err.email = "Valid email required";
    if (!form.phone) err.phone = "Phone is required";

    if (
      users.some(
        (u) =>
          (u.email === form.email || u.phone === form.phone) &&
          u.id !== editingUser?.id
      )
    ) {
      err.email = "Email or phone already exists";
    }

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    editingUser
      ? onUpdate({ ...editingUser, ...form })
      : onAdd({
          id: Date.now(),
          ...form,
          address: { street: "N/A", city: "N/A" },
          company: { name: "N/A" },
          website: "N/A",
        });

    setForm({ name: "", email: "", phone: "" });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-xl font-semibold">
        {editingUser ? "Edit User" : "Add New User"}
      </h3>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className="w-full border p-2 rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Phone"
        className="w-full border p-2 rounded"
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <button className="w-full bg-indigo-600 text-white py-2 rounded">
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default AddUserForm;

