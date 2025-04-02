import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import initialVehicles from "../data/vehicles"; // Import initial dataset

const VehicleForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [horsepower, setHorsepower] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const mergedVehicles = storedVehicles.length > 0 ? storedVehicles : initialVehicles;
    setVehicles(mergedVehicles);
  }, []);

  useEffect(() => {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d+$/.test(topSpeed) || !/^\d+$/.test(horsepower)) {
      alert("Top speed and horsepower must be numeric values.");
      return;
    }

    const newVehicle = {
      id: vehicles.length + 1,
      brand,
      name,
      type,
      topSpeed: `${topSpeed}`,
      horsepower: `${horsepower}`,
      description,
      image,
    };

    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));

    navigate("/vehicles");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} required />
      <input type="text" placeholder="Top Speed (km/h)" value={topSpeed} onChange={(e) => setTopSpeed(e.target.value)} required />
      <input type="text" placeholder="Horsepower (hp)" value={horsepower} onChange={(e) => setHorsepower(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="url" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <button type="submit">Add Motorcycle</button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    margin: "auto",
  },
};

export default VehicleForm;
