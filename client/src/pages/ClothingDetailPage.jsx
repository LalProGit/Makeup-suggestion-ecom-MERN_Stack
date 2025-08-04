import {useState, useEffect, use} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';


const ClothingDetailPage = () => {
    const [clothing, setClothing] = useState(null);
    const [recommendation, setRecommendation] = useState([]);
    const [error, setError] = useState("");

    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                const { data } = await axios.get(`/clothing/${id}`);
                setClothing(data);
            }catch (err) {
                setError(err.response?.data?.message || "Failed to fetch clothing details");
            }
        }
        fetchClothing();
    }, [id]);

    useEffect( () => {
        const fetchRecommendations = async () => {
            if(!user || !user.token) return;
            try {
                const { data } = await axios.get(`recommend/${id}`);
                setRecommendation(data.recommendations);
            }catch (err) {
                setError(err.response?.data?.message || "Failed to fetch recommendations");
            }
        }
        fetchRecommendations();
    }, [user, id]);

    const addToCart = async (productId, model = "Clothing") => {
    try {
      const { data } = await axios.post(
        "/cart/add",
        {
          productId,
          model,
          quantity: 1,
        }
      );
      alert("Added to cart");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };
   if (error) return <p>{error}</p>;
  if (!clothing) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{clothing.name}</h2>
      <img src={clothing.image} alt={clothing.name} width="250" />
      <p><strong>Brand:</strong> {clothing.brand}</p>
      <p><strong>Description:</strong> {clothing.description}</p>
      <p><strong>Price:</strong> ₹{clothing.price}</p>
      <p><strong>Available Sizes:</strong> {clothing.size.join(", ")}</p>
      <p><strong>Color:</strong> {clothing.color}</p>

      <button onClick={() => addToCart(clothing._id, "Clothing")}>
        Add to Cart
      </button>

      <hr />

      <h3>Recommended Makeup for You</h3>
      {recommendation.length === 0 ? (
        <p>No recommendations available for your skin tone.</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {recommendation.map((item) => (
            <div key={item._id} style={{ border: "1px solid #ccc", padding: "10px", width: "180px" }}>
              <img src={item.image} alt={item.name} width="160" height="180" style={{ objectFit: "cover" }} />
              <h4>{item.name}</h4>
              <p>{item.category} - {item.shade}</p>
              <p>₹ {item.price}</p>
              <button onClick={() => addToCart(item._id, "Makeup")}>Add</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClothingDetailPage;
