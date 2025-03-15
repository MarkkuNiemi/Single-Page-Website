import { useState } from "react";
import axios from "axios";

export default function UpdateUser({ onUserUpdated, buttonClass = "btn btn-warning" }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");  // Käytetään address
    const [phone, setPhone] = useState("");      // Käytetään phone
    const [message, setMessage] = useState("");

    const handleUpdate = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            // Lähetetään PUT-pyyntö backendille käyttäjän päivittämiseksi
            const response = await axios.put(`http://localhost:3000/users/${id}`, {
                name,
                address,  // Lähetetään address kenttä
                phone,    // Lähetetään phone kenttä
            });
            setMessage("User updated successfully: " + response.data.id);
            setId("");  // Tyhjennetään ID
            setName(""); // Tyhjennetään name
            setAddress(""); // Tyhjennetään address
            setPhone("");   // Tyhjennetään phone
            if (onUserUpdated) onUserUpdated(); // Kutsutaan päivitysfunktiota
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            <h2>Update User</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button type="submit" className={`${buttonClass} btn-sm w-50`}>
                    Update
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
