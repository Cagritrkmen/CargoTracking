import { useState } from "react";
import { updatePackage } from "../api/packageApi";
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-6xl space-y-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">📦 Kargo Bilgileri</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SOL FORM */}
          <div className="space-y-4">
            {/* Takip Numarası */}
            <div>
              <label className="block text-sm font-semibold">Takip Numarası</label>
              <input
                type="text"
                value={pkg.trackingNumber}
                disabled
                className="w-full px-3 py-2 border rounded bg-gray-100"
              />
            </div>

            {/* Gönderen ve Alıcı Yan Yana */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold">Gönderen</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Alıcı</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
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

            {/* Kargo Geçmişi */}
            <div>
              <label className="block text-sm font-semibold">Kargo Geçmişi</label>
              <div className="max-h-48 overflow-y-auto border p-2 rounded text-sm bg-gray-50">
                {pkg.history.length === 0 ? (
                  <p className="text-gray-500 text-center">Henüz geçmiş verisi yok.</p>
                ) : (
                  pkg.history
                    .slice()
                    .reverse()
                    .map((h, i) => (
                      <div key={i} className="border-b pb-2 mb-2">
                        <p><strong>Konum:</strong> {h.location}</p>
                        <Tooltip title={statusOptions[h.status]?.description}>
                          <Chip
                            label={`${statusOptions[h.status]?.icon || ""} ${h.status}`}
                            color={statusOptions[h.status]?.color || "default"}
                            size="small"
                            variant="filled"
                          />
                        </Tooltip>
                        <p><strong>Tarih:</strong> {new Date(h.date).toLocaleString("tr-TR")}</p>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex flex-wrap justify-end gap-2 pt-4">
              <button
                onClick={handleCancelPackage}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {loading ? "İşlem Yapılıyor..." : "Kargoyu İptal Et"}
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {loading ? "Kaydediliyor..." : "Güncelle"}
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Vazgeç
              </button>
            </div>
          </div>

          {/* SAĞ TARAF — Harita */}
          <div>
            <TurkeyMap
              selectedCity={currentLocation}
              currentLocation={pkg.currentLocation}
              onSelectCity={(city) => setCurrentLocation(city)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
