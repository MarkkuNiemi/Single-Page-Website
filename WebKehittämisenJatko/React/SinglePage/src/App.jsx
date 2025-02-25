import { useState } from "react";
import "./App.css";

function Navbar() {
  return (
    <nav>
      <ul className="navbar">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <Navbar />
      <h1>Welcome to My Simple Page</h1>
    </header>
  );
}

function About() {
  return (
    <section id="about">
      <h2>About</h2>
      <p>This is a simple single-page website example. It is clean, minimalistic, and easy to understand.</p>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact">
      <h2>Contact</h2>
      {submitted ? (
        <p>Form submitted. Thank you!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Simple Single Page. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;

