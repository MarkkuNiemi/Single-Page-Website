import { useState, useEffect } from "react";
import axios from "axios";

export default function ReadDeleteUsers({ refresh, buttonClass = "btn btn-danger" }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Käyttäjien hakeminen backendista
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/users");
            setUsers(response.data);
        } catch (err) {
            setError("Error fetching users: " + (err.response?.data?.error || err.message));
        }
    };

    // Haetaan käyttäjät aina, kun 'refresh' muuttuu
    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    // Käyttäjän poistaminen
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/users/${id}`);
            fetchUsers();  // Haetaan käyttäjät uudelleen poiston jälkeen
            setMessage(`User with ID ${id} deleted successfully.`);  // Ilmoitetaan onnistuneesta poistosta
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.error || error.message));  // Virheilmoitus
        }
    };

    return (
        <div>
            <h2>Users List</h2>
            {error && <p>{error}</p>} {/* Virheviesti, jos käyttäjiä ei voida hakea */}
            {message && <p>{message}</p>} {/* Onnistumis- tai virheviesti */}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>User ID:</strong> {user.id} <strong>Name:</strong> {user.name} <strong>Address:</strong> {user.address} <strong>Phone:</strong> {user.phone}
                        <button onClick={() => handleDelete(user.id)} className={`${buttonClass} btn-sm w-50`}>
                            Delete
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
}
