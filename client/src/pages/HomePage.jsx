import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import "./HomePage.css";
import { Link } from 'react-router-dom';


function HomePage() {
  const [clothingItems, setClothingItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [error, setError] = useState("");


  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect( ()=> {
    const fetchClothingItems = async () => {
      try {
        const { data } = await axios.get('/clothing');
        setClothingItems(data);
        setFilteredItems(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch clothing items");
      }
    }
    fetchClothingItems();
  }, [])

  useEffect(() => {
    let filter = [...clothingItems];
    if (filterColor) {
      filter = filter.filter(item => item.color === filterColor);
    }

    if (sortOption === "priceHighToLow") {
      filter.sort((a, b) => b.price - a.price);
    }
    if (sortOption === "priceLowToHigh") {
      filter.sort((a, b) => a.price - b.price);
    }
    setFilteredItems(filter);
  }, [clothingItems, sortOption, filterColor]);



  return (
    <div className="home-container">
      <h2>Clothing Collection</h2>

      <div className="filter-sort">
        <label>
          Sort by:
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </label>

        <label>
          Filter by Color:
          <select value={filterColor} onChange={(e) => setFilterColor(e.target.value)}>
            <option value="">-- All --</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="off-white">Off-white</option>
            <option value="lavender">Lavender</option>
            <option value="sage">Sage</option>
          </select>
        </label>
      </div>

      <div className="product-grid">
        {filteredItems.map((item) => (
          <div className="product-card" key={item._id}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>₹ {item.price}</p>
            <Link to={`/clothing/${item._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;