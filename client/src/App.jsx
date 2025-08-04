import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import VerifyOtp from "./pages/VerifyOtp";
import ClothingDetailPage from "./pages/ClothingDetailPage";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/clothing/:id" element={<ClothingDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile"  element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
