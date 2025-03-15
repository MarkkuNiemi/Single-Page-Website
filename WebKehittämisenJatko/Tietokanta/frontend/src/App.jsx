import CreateUser from "./components/CreateUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import ReadDeleteUsers from "./components/ReadDeleteUsers.jsx";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Lisäämme oman CSS-tiedoston muokkaamaan ulkoasua

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center custom-bg">
      <h1 className="text-center mb-4 text-dark fw-bold display-3 custom-heading">User Management</h1>
      <div className="w-75">
        {/* Create User Section */}
        <div className="card p-5 shadow-lg mb-4 bg-light border-0 rounded-4 custom-card">
          <h2 className="text-center text-primary mb-4 custom-subheading">Create User</h2>
          <CreateUser onUserAdded={() => setRefresh(prev => prev + 1)} buttonClass="btn btn-outline-primary btn-sm w-50 custom-btn" />
        </div>

        {/* Users List Section */}
        <div className="card p-5 shadow-lg mb-4 bg-light border-0 rounded-4 custom-card">
          <h2 className="text-center text-danger mb-4 custom-subheading">Users List</h2>
          <ReadDeleteUsers refresh={refresh} buttonClass="btn btn-outline-danger btn-sm w-50 custom-btn" />
        </div>

        {/* Update User Section */}
        <div className="card p-5 shadow-lg bg-light border-0 rounded-4 custom-card">
          <h2 className="text-center text-warning mb-4 custom-subheading">Update User</h2>
          <UpdateUser onUserUpdated={() => setRefresh(prev => prev + 1)} buttonClass="btn btn-outline-warning btn-sm w-50 custom-btn" />
        </div>
      </div>
    </div>
  );
}

export default App;
