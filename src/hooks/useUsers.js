import React from "react";
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cached = localStorage.getItem("users");

    if (cached) {
      setUsers(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetchUsers()
      .then((data) => {
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
      })
      .catch(() => setError("Failed to fetch users"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (users.length) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  return { users, setUsers, loading, error };
};
