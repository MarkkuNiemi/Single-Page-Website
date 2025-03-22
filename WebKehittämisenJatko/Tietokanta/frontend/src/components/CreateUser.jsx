import React from "react";  // Lisää tämä, jos sitä ei ole
import { useState } from "react";
import axios from "axios";

export default function CreateUser({ onUserAdded, buttonClass = "btn btn-primary" }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");  // Lisätään address
    const [phone, setPhone] = useState("");      // Lisätään phone
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");  // Tyhjennetään mahdollinen edellinen viesti

        try {
            // Lähetetään POST-pyyntö käyttäjän luomiseksi
            const response = await axios.post("http://localhost:3000/users", {
                name,
                address,  // Lähetetään address kenttä
                phone,    // Lähetetään phone kenttä
            });

            setMessage("User created successfully: " + response.data.name);  // Näytetään onnistumisviesti
            setName("");  // Tyhjennetään kenttä
            setAddress(""); // Tyhjennetään kenttä
            setPhone("");   // Tyhjennetään kenttä
            if (onUserAdded) onUserAdded(); // Kutsutaan päivitysfunktiota, jos sellainen annetaan
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.error || error.message));  // Näytetään virheviesti
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
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
                    Create
                </button>

            </form>
            {message && <p>{message}</p>} {/* Virhe- tai onnistumisviesti */}
        </div>
    );
}
