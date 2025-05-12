import { useState } from "react";
import { getPackageByTrackingNumber } from "../api/packageApi";

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageInfo, setPackageInfo] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await getPackageByTrackingNumber(trackingNumber);
      setPackageInfo(data);
    } catch (err) {
      setPackageInfo(null);
      setError(err.message || "Kargo bulunamadı");
    }
  };

  return (
    <div className="w-full max-w-xl bg-cyan-500 border-8 border-yellow-400 shadow-lg p-8 flex flex-col items-center text-center rounded-3xl">
      <h1 className="text-2xl text-white font-bold mb-6 flex items-center gap-2">
        <span>📦</span> GÖNDERİ TAKİBİ  
      </h1>

      <form onSubmit={handleSubmit} className="w-full flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Takip numarası girin"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Sorgula
        </button>
      </form>

      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {packageInfo && (
        <div className="mt-4 text-left w-full space-y-1">
          <p><strong>Gönderen:</strong> {packageInfo.sender}</p>
          <p><strong>Alıcı:</strong> {packageInfo.recipient}</p>
          <p><strong>Konum:</strong> {packageInfo.currentLocation}</p>
          <p><strong>Durum:</strong> {packageInfo.status}</p>
        </div>
      )}
    </div>
  );
};

export default TrackingForm;
