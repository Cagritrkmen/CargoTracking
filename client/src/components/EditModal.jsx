import { useState } from "react";
import { updatePackage } from "../api/packageApi";
import TurkeyMap from "./TurkeyMap";
import toast from "react-hot-toast";

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
            onUpdated(); // dashboard yeniden fetch yapacak
            onClose();
        } catch (err) {
            toast.error("Güncelleme başarısız ❌");
            setError("Güncelleme başarısız: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-6xl space-y-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">📦 Kargo Güncelle</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SOL FORM */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold">Takip Numarası</label>
                            <input
                                type="text"
                                value={pkg.trackingNumber}
                                disabled
                                className="w-full px-3 py-2 border rounded bg-gray-100"
                            />
                        </div>

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

                        <div>
                            <label className="block text-sm font-semibold">Durum</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            >
                                {["Hazırlanıyor", "Yola Çıktı", "Dağıtımda", "Teslim Edildi"].map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Kargo Geçmişi</label>
                            <div className="max-h-48 overflow-y-auto border p-2 rounded text-sm">
                                {pkg.history.length === 0 ? (
                                    <p className="text-gray-500">Henüz geçmiş verisi yok.</p>
                                ) : (
                                    pkg.history.slice().reverse().map((h, i) => (
                                        <div key={i} className="border-b pb-1 mb-1">
                                            <p><strong>Konum:</strong> {h.location}</p>
                                            <p><strong>Durum:</strong> {h.status}</p>
                                            <p><strong>Tarih:</strong> {new Date(h.date).toLocaleString("tr-TR")}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
                                İptal
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {loading ? "Kaydediliyor..." : "Güncelle"}
                            </button>
                        </div>
                    </div>

                    {/* SAĞ HARİTA */}
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
