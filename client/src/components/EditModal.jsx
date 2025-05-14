import { useState } from "react";
import { updatePackage, deletePackage } from "../api/packageApi";
import TurkeyMap from "./TurkeyMap";
import toast from "react-hot-toast";
import { Chip, Tooltip } from "@mui/material";
import { statusOptions } from "../utils/statusOptions";


const EditModal = ({ isOpen, onClose, pkg, onUpdated }) => {
  const [currentLocation, setCurrentLocation] = useState(pkg.currentLocation);
  const [status, setStatus] = useState(pkg.status);
  const [sender, setSender] = useState(pkg.sender);
  const [recipient, setRecipient] = useState(pkg.recipient);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setError("");
    setLoading(true);
    try {
      await updatePackage(pkg.trackingNumber, {
        currentLocation,
        status,
        sender,
        recipient,
      });
      toast.success("Kargo başarıyla güncellendi ✅");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error("Güncelleme başarısız ❌");
      setError("Güncelleme başarısız: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPackage = async () => {
    const confirm = window.confirm("Bu kargoyu iptal etmek istediğinize emin misiniz?");
    if (!confirm) return;

    setError("");
    setLoading(true);
    try {
      await updatePackage(pkg.trackingNumber, {
        currentLocation,
        status: "İptal Edildi",
        sender,
        recipient,
      });
      toast.success("Kargo başarıyla iptal edildi ");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error("İptal işlemi başarısız ❌");
      setError("İptal başarısız: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bu kargoyu kalıcı olarak silmek istediğinize emin misiniz?");
    if (!confirmDelete) return;
    setError("");
    setLoading(true);
    try {
      await deletePackage(pkg.trackingNumber);
      toast.success("Kargo kalıcı olarak silindi ✅");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error("Silme başarısız ❌");
      setError("Silme başarısız: " + err.message);
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
              Kargo Bilgileri
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
            {/* SOL FORM */}
            <div className="space-y-4 flex flex-col h-full justify-between">
              {/* Takip Numarası */}
              <div>
                <label className="block text-xs font-semibold text-cyan-800 mb-1">Takip Numarası</label>
                <input
                  type="text"
                  value={pkg.trackingNumber}
                  disabled
                  className="w-full px-4 py-2 border border-cyan-200 rounded-xl bg-cyan-50 text-cyan-900"
                />
              </div>
              {/* Gönderen ve Alıcı Yan Yana */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-cyan-800 mb-1">Gönderen</label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full px-4 py-2 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-cyan-50 text-cyan-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-cyan-800 mb-1">Alıcı</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-2 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-cyan-50 text-cyan-900"
                  />
                </div>
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
              {/* Kargo Geçmişi */}
              <div>
                <label className="block text-xs font-semibold text-cyan-800 mb-1">Kargo Geçmişi</label>
                <div className="max-h-36 overflow-y-auto border p-2 rounded-xl text-xs sm:text-sm bg-gray-50">
                  {pkg.history.length === 0 ? (
                    <p className="text-gray-500 text-center">Henüz geçmiş verisi yok.</p>
                  ) : (
                    pkg.history
                      .slice()
                      .reverse()
                      .map((h, i) => (
                        <div key={i} className="border-b pb-2 mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                          <span className="font-semibold text-cyan-800">Konum: {h.location}</span>
                          <Tooltip title={statusOptions[h.status]?.description}>
                            <Chip
                              label={`${statusOptions[h.status]?.icon || ""} ${h.status}`}
                              color={statusOptions[h.status]?.color || "default"}
                              size="small"
                              variant="filled"
                            />
                          </Tooltip>
                          <span className="text-gray-500">Tarih: {h.date ? new Date(h.date).toLocaleString("tr-TR") : "-"}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>
              {/* Butonlar */}
              <div className="flex flex-col sm:flex-row justify-start gap-2 pt-2 w-full mt-2">
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-700 text-white font-bold rounded-xl shadow hover:bg-red-800 transition-all duration-150 text-base max-w-xs"
                >
                  {loading ? "Siliniyor..." : "Kargoyu Sil"}
                </button>
                <button
                  onClick={handleCancelPackage}
                  disabled={loading}
                  className="flex-1 px-2 py-1 bg-purple-600 text-white font-bold rounded-xl shadow hover:bg-red-700 transition-all duration-150 text-base max-w-xs"
                >
                  {loading ? "İşlem Yapılıyor..." : "Kargoyu İptal Et"}
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition-all duration-150 text-base max-w-xs"
                >
                  {loading ? "Kaydediliyor..." : "Güncelle"}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-cyan-300 rounded-xl text-cyan-700 font-semibold bg-white hover:bg-cyan-50 transition-all duration-150 text-base max-w-xs"
                >
                  Vazgeç
                </button>
              </div>
            </div>
            {/* SAĞ TARAF — Harita */}
            <div className="w-full overflow-x-auto flex justify-center items-center">
              <div className="min-w-[380px] md:min-w-[480px] max-w-full">
                <TurkeyMap
                  selectedCity={currentLocation}
                  currentLocation={pkg.currentLocation}
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

export default EditModal;
