import { useState } from "react";
import apiClient from "../services/api-client";

const Newsletter = () => {
  // Setting states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Asynchronous function triggered when the form is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sending POST-request to backend with name and email with user input
    try { 
      await apiClient.post("/newsletter", { name, email });
      // if succesfull: Show message and empty input fields
      setMessage("Thank you for subscribing!");
      setName("");
      setEmail("");
      // if fails: Show error message
    } catch (error) {
      setMessage("There was an error, please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Subscribe to our Newsletter</h2>
      {/* User form for signing up */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="styled_button" >Subscribe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Newsletter;
