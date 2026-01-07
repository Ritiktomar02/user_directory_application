import React from "react";
import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const cached = localStorage.getItem("users");
        if (cached) {
          setUsers(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, setUsers, loading, error };
};
