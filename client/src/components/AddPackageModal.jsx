import { useState } from "react";
import { createPackage } from "../api/packageApi"; // ➔ Bunu yazacağız
import TurkeyMap from "./TurkeyMap";
import toast from "react-hot-toast";
import { statusOptions } from "../utils/statusOptions";

const AddPackageModal = ({ isOpen, onClose, onCreated }) => {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [status, setStatus] = useState("Hazırlanıyor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateTrackingNumber = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `TRK-${randomNum}`;
  };

  const handleCreate = async () => {
    if (!sender || !recipient || !currentLocation || !status) {
      toast.error("Lütfen tüm alanları doldurun!");
      return;
    }

    setError("");
    setLoading(true);
    const trackingNumber = generateTrackingNumber();

    try {
      await createPackage({
        trackingNumber,
        sender,
        recipient,
        currentLocation,
        status,
      });
      toast.success("Kargo başarıyla eklendi ✅");
      onCreated(); // Listeyi yenilemek için
      onClose();
    } catch (err) {
      toast.error("Kargo ekleme başarısız ❌");
      setError("Ekleme hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-6xl space-y-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">➕ Yeni Kargo Ekle</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SOL FORM */}
          <div className="space-y-4">

            {/* Gönderen */}
            <div>
              <label className="block text-sm font-semibold">Gönderen</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Alıcı */}
            <div>
              <label className="block text-sm font-semibold">Alıcı</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Durum */}
            <div>
              <label className="block text-sm font-semibold">Durum</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                {["Hazırlanıyor", "Yola Çıktı", "Dağıtımda", "Teslim Edildi"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Butonlar */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={handleCreate}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {loading ? "Ekleniyor..." : "Kargoyu Ekle"}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Vazgeç
              </button>
            </div>
          </div>

          {/* SAĞ FORM - Harita */}
          <div>
            <TurkeyMap
              selectedCity={currentLocation}
              onSelectCity={(city) => setCurrentLocation(city)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
