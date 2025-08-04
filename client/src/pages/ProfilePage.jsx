import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const { user, logout, login } = useAuth();
    const [form, setForm] = useState({
        name: user ? user.name : "",
        skinTone: user ? user.skinTone : "",
        lipColorPreference: user ? user.lipColorPreference : "",
        house: user && user.address ? user.address.house : "",
        street: user && user.address ? user.address.street : "",
        city: user && user.address ? user.address.city : "",
        postalCode: user && user.address ? user.address.postalCode : "",
        country: user && user.address ? user.address.country : ""
    });
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const updateUserProfile = async () => {
        try {
            const response = await axios.put('user/profile', form);
            setEditMode(false);
            setForm(response.data.user);
            login(response.data.user);
        }catch(err) {
            setError(err.response?.data?.message || "Failed to update profile");
        }
    }

    const addAddress = async ()  => {
        setEditMode(true);
    }


    return (
        <>
        {editMode ? <div>
            <h2>Edit Profile</h2>
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input type="text" name="skinTone" placeholder="Skin Tone" value={form.skinTone} onChange={handleChange} />
            <input type="text" name="lipColorPreference" placeholder="Lip Color Preference" value={form.lipColorPreference} onChange={handleChange} />
            <input type="text" name="house" placeholder="House" value={form.house} onChange={handleChange} />
            <input type="text" name="street" placeholder="Street" value={form.street} onChange={handleChange}/>
            <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <input type="text" name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} />
            <button onClick={updateUserProfile}>Save</button>

        </div> :
        <div className="profile-container">
            <h2>Profile</h2>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>Skintone: {user.skinTone}</p>
            <p>Lip Color Preference: {user.lipColorPreference}</p>
            <p>Address: {user.address ? `${user.address.house}, ${user.address.street}, ${user.address.city}, ${user.address.postalCode}, ${user.address.country}` : <button onClick= {addAddress}>Add Address</button>}</p>
        </div>}
        </>
    )
}

export default ProfilePage;