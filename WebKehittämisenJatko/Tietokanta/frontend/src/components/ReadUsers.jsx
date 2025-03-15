import { useState, useEffect } from "react";
import axios from "axios";

export default function ReadUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setUsers(response.data);
            } catch (err) {
                setError("Error fetching users: " + (err.response?.data?.error || err.message));
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>User ID: {user.id} Name: {user.name}</strong> - Address: {user.address}, Phone: {user.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
}
