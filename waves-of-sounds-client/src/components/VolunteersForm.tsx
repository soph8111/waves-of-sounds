import { useState } from "react";
import apiClient from "../services/api-client";
import { Department } from "../hooks/useDepartment";
import DepartmentSelector from "./VolunteersSelectorDepartment";

const VolunteerForm = () => {
  // States for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validating department selection
    if (!selectedDepartment) {
      setMessage("Please select a department.");
      return;
    }

    try {
      // Sending POST request with form data
      await apiClient.post("/volunteers", {
        name,
        email,
        departmentId: selectedDepartment.id,
      });

      // Clearing form fields on success
      setMessage("Thank you for signing up as a volunteer!");
      setName("");
      setEmail("");
      setSelectedDepartment(null);
    } catch (error) {
      setMessage("There was an error, please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up as a Volunteer</h2>
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email input */}
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Department selector */}
        <DepartmentSelector
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
        />

        {/* Submit button */}
        <button type="submit">Sign Up</button>
      </form>

      {/* Success/Error message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default VolunteerForm
