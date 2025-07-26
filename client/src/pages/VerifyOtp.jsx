import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const { pendingUser, login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOtp(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if(!pendingUser) {
            return setError("No registration data found. Please register first.");
        }

        try {
            const { data } = await axios.post("/auth/verifyUser", { ...pendingUser, otp });
            login(data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "OTP verification failed");
        }
    }

    return ( 
        <div>
      <h2>Verify OTP</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Verify</button>
      </form>
    </div>
    );
};

export default VerifyOtp;