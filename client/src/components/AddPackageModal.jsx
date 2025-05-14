import { useState } from "react";
import { createPackage } from "../api/packageApi";
import TurkeyMap from "./TurkeyMap";
import toast from "react-hot-toast";
import { statusOptions } from "../utils/statusOptions";
import AddIcon from '@mui/icons-material/Add';

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
      <div className="bg-gradient-to-br from-yellow-100 to-blue-100 p-1 rounded-2xl shadow-2xl w-[99vw] max-w-3xl md:!max-w-3xl lg:!max-w-6xl sm:!max-w-2xl max-h-[97vh] overflow-y-auto">
        <div className="bg-white rounded-2xl p-2 sm:p-6 md:p-10 space-y-6">
          {/* Başlık */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2">
            <img src="/logo.png" alt="ÇağrıKargo" className="h-10 w-auto" />
            <span className="text-cyan-900 font-bold text-xl sm:text-2xl tracking-tight flex items-center gap-2">
              Yeni Kargo Ekle
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
            {/* SOL FORM */}
            <div className="space-y-4 flex flex-col h-full justify-between">
              {/* Gönderen */}
              <div>
                <label className="block text-xs font-semibold text-cyan-800 mb-1">Gönderen</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-4 py-2 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-cyan-50 text-cyan-900"
                  placeholder="Gönderen adı"
                />
              </div>
              {/* Alıcı */}
              <div>
                <label className="block text-xs font-semibold text-cyan-800 mb-1">Alıcı</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-4 py-2 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-cyan-50 text-cyan-900"
                  placeholder="Alıcı adı"
                />
              </div>
              {/* Durum */}
              <div>
                <label className="block text-xs font-semibold text-cyan-800 mb-1">Durum</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-cyan-50 text-cyan-900"
                >
                  {["Hazırlanıyor", "Yola Çıktı", "Dağıtımda", "Teslim Edildi"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {/* Butonlar */}
              <div className="flex flex-col sm:flex-row justify-start gap-2 pt-2 w-full mt-2">
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-blue-500 text-white font-bold rounded-xl shadow hover:from-yellow-300 hover:to-blue-700 transition-all duration-150 text-base max-w"
                >
                  {loading ? "Ekleniyor..." : "Kargoyu Ekle"}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-cyan-300 rounded-xl text-cyan-700 font-semibold bg-white hover:bg-cyan-50 transition-all duration-150 text-base max-w"
                >
                  Vazgeç
                </button>
              </div>
            </div>
            {/* SAĞ FORM - Harita */}
            <div className="w-full overflow-x-auto flex justify-center items-center">
              <div className="min-w-[380px] md:min-w-[480px] max-w-full">
                <TurkeyMap
                  selectedCity={currentLocation}
                  onSelectCity={(city) => setCurrentLocation(city)}
                />
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
