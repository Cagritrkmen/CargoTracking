import { useEffect, useState } from "react";
import { getAllPackages } from "../api/packageApi";

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackages();
        setPackages(data);
      } catch (err) {
        setError("Kargolar getirilemedi: " + err.message);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📦 Admin Panel - Kargolar</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white p-4 rounded shadow">
            <p><strong>Takip No:</strong> {pkg.trackingNumber}</p>
            <p><strong>Konum:</strong> {pkg.currentLocation}</p>
            <p><strong>Durum:</strong> {pkg.status}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
              Düzenle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
