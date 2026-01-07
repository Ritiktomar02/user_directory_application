import React from "react";
import { useMemo, useState } from "react";
import { useUsers } from "./hooks/useUsers";
import toast from "react-hot-toast";

import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import UserModal from "./components/UserModal";
import AddUserForm from "./components/AddUserForm";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import ConfirmModal from "./components/ConfirmModal";

const USERS_PER_PAGE = 6;

function App() {
  const { users, setUsers, loading, error } = useUsers();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmUserId, setConfirmUserId] = useState(null);

  const filteredUsers = useMemo(() => {
    return users
      .filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // ✅ reset page inside handler (not useEffect)
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleAdd = (user) => {
    setUsers((prev) => [user, ...prev]);
    toast.success("User added successfully");
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = (updatedUser) => {
    if (!updatedUser) {
      setEditingUser(null);
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setEditingUser(null);
    toast.success("User updated successfully");
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== confirmUserId));
    setConfirmUserId(null);
    toast.success("User deleted successfully");
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">
            User Directory
          </h1>
          <p className="text-gray-500">
            Manage users with search, edit, and pagination
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <AddUserForm
          key={editingUser?.id || "new"}
          users={users}
          editingUser={editingUser}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
        />

        <SearchBar value={search} onChange={handleSearchChange} />

        <UserList
          users={paginatedUsers}
          onView={setSelectedUser}
          onEdit={handleEdit}
          onDelete={setConfirmUserId}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>

      {confirmUserId && (
        <ConfirmModal
          title="Delete User"
          message="This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmUserId(null)}
        />
      )}
    </div>
  );
}

export default App;

