import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    skinTone: "medium",
    lipColorPreference: "nude",
  });
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("/auth/register", form);
      register(form);
      navigate("/verify-otp");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required /><br />

        <select name="skinTone" value={form.skinTone} onChange={handleChange}>
          <option value="fair">Fair</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="tan">Tan</option>
          <option value="deep">Deep</option>
        </select><br />

        <select name="lipColorPreference" value={form.lipColorPreference} onChange={handleChange}>
          <option value="nude">Nude</option>
          <option value="red">Red</option>
          <option value="pink">Pink</option>
        </select><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
