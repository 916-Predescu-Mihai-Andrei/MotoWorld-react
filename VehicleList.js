import { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard";
import initialVehicles from "../data/vehicles"; // Import initial dataset

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  const highestSpeed = Math.max(...vehicles.map(vehicle => parseInt(vehicle.topSpeed)), 0);
  const slowestSpeed = Math.min(...vehicles.map(vehicle => parseInt(vehicle.topSpeed)), Infinity);

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const mergedVehicles = storedVehicles.length > 0 ? storedVehicles : initialVehicles; 
    setVehicles(mergedVehicles);
  }, []);

  // Delete a vehicle
  const handleDelete = (id) => {
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
  };

  // Edit a vehicle
  const handleEdit = (updatedVehicle) => {
    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    );
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
  };

  return (
    <div style={styles.bikeGrid}>
      {vehicles.map(vehicle => (
        <VehicleCard 
          key={vehicle.id}
          vehicle={vehicle}
          isFastest={parseInt(vehicle.topSpeed) === highestSpeed}
          isSlowest={parseInt(vehicle.topSpeed) === slowestSpeed}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};


const styles = {
  bikeGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", 
    gap: "20px", 
    marginTop: "20px",
    alignItems: "stretch", 
  },
};


export default VehicleList;
