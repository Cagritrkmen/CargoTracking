import { useState } from "react";
import { getPackageByTrackingNumber } from "../api/packageApi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { statusOptions } from "../utils/statusOptions";

const TrackingForm = ({ isModalOpen, setIsModalOpen }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageInfo, setPackageInfo] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await getPackageByTrackingNumber(trackingNumber);
      setPackageInfo(data);
      setIsModalOpen(true);
    } catch (err) {
      setPackageInfo(null);
      setError(err.message || "Kargo bulunamadı");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      {/* Modal Başlangıcı */}
      {isModalOpen && packageInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-4 w-full max-w-md sm:max-w-2xl relative flex flex-col max-h-[95vh] overflow-y-auto justify-between">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
              aria-label="Kapat"
              tabIndex="0"
            >
              ×
            </button>
            <div className="flex-1 flex flex-col justify-start">
              {/* Kargo Durum Adımları */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-4 mt-2">
                {[
                  { label: "Hazırlanıyor", icon: HomeIcon, key: "Hazırlanıyor" },
                  { label: "Yola Çıktı", icon: LocalShippingIcon, key: "Yola Çıktı" },
                  { label: "Dağıtımda", icon: DeliveryDiningIcon, key: "Dağıtımda" },
                  { label: "Teslim Edildi", icon: CheckCircleIcon, key: "Teslim Edildi" },
                  { label: "İptal Edildi", icon: CheckCircleIcon, key: "İptal Edildi" },
                ].map((step, idx) => {
                  const statusOrder = ["Hazırlanıyor", "Yola Çıktı", "Dağıtımda", "Teslim Edildi", "İptal Edildi"];
                  const currentIdx = statusOrder.indexOf(packageInfo.status);
                  const isActive = idx <= currentIdx && currentIdx !== -1;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex flex-col items-center min-w-[48px]">
                      <Icon className={
                        isActive
                          ? (step.key === "İptal Edildi" ? "text-red-500" : "text-green-500")
                          : "text-yellow-400"
                      } fontSize="medium" />
                      <span className={
                        isActive
                          ? (step.key === "İptal Edildi" ? "text-[10px] font-bold mt-1 text-red-600" : "text-[10px] font-bold mt-1 text-green-600")
                          : "text-[10px] font-semibold mt-1 text-gray-700"
                      }>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Takip No */}
              <div className="text-center mb-2 text-xs sm:text-sm">
                <span className="text-cyan-700 font-bold">TAKİP NO :</span>
                <span className="ml-2 text-blue-700 font-mono tracking-wider select-all break-all">{packageInfo.trackingNumber}</span>
              </div>

              {/* Bilgi Kutuları */}
              <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-4 w-full">
                {/* Gönderici */}
                <div className="flex-1 bg-cyan-100 rounded-xl p-2 sm:p-3 border-2 border-cyan-300 shadow-sm min-w-0">
                  <div className="text-xs text-cyan-700 font-semibold mb-1">ÇIKIŞ İL / İLÇE</div>
                  <div className="text-sm font-bold text-cyan-900 mb-1">{packageInfo.senderCity || (packageInfo.history && packageInfo.history[0]?.location) || "-"}</div>
                  <div className="text-xs text-cyan-800"><b>GÖNDERİCİ:</b> {packageInfo.sender || "-"}</div>
                  <div className="text-xs text-cyan-800"><b>GÖNDERİCİ ADRES:</b> {(packageInfo.history && packageInfo.history[0]?.location) || packageInfo.senderAddress || "-"}</div>
                  <div className="text-[10px] text-gray-500 mt-1">KABUL TARİHİ: {packageInfo.createdAt ? new Date(packageInfo.createdAt).toLocaleDateString("tr-TR") : "-"}</div>
                </div>
                {/* Alıcı */}
                <div className="flex-1 bg-yellow-100 rounded-xl p-2 sm:p-3 border-2 border-yellow-300 shadow-sm min-w-0">
                  <div className="text-xs text-yellow-700 font-semibold mb-1">VARIŞ İL / İLÇE</div>
                  <div className="text-sm font-bold text-yellow-900 mb-1">{packageInfo.recipientCity || (packageInfo.status === "Teslim Edildi" && packageInfo.history && packageInfo.history[packageInfo.history.length-1]?.location) || "-"}</div>
                  <div className="text-xs text-yellow-800"><b>ALICI:</b> {packageInfo.recipient || "-"}</div>
                  <div className="text-xs text-yellow-800"><b>ALICI ADRES:</b> {(packageInfo.status === "Teslim Edildi" && packageInfo.history && packageInfo.history[packageInfo.history.length-1]?.location) || packageInfo.recipientAddress || "-"}</div>
                  <div className="text-xs text-yellow-800"><b>TESLİM ALAN:</b> {packageInfo.recipient || "-"}</div>
                </div>
              </div>

              {/* Kargo Geçmişi */}
              <div className="mb-2 w-full">
                <div className="text-center text-sm font-bold text-cyan-700 mb-1">Kargo Hareket Geçmişi</div>
                <div className="max-h-32 sm:max-h-48 overflow-y-auto border p-2 rounded text-[11px] sm:text-xs bg-gray-50">
                  {packageInfo.history && packageInfo.history.length > 0 ? (
                    packageInfo.history.slice().reverse().map((h, i) => (
                      <div key={i} className="border-b pb-1 mb-1 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="font-semibold text-cyan-800">{h.status || '-'}</span>
                        <span className="text-gray-700">{h.location || '-'}</span>
                        <span className="text-gray-500">{h.date ? new Date(h.date).toLocaleString("tr-TR") : '-'}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-center">Geçmiş hareket bulunamadı.</div>
                  )}
                </div>
              </div>
            </div>
            {/* Sticky Footer */}
            <div className="sticky bottom-0 left-0 w-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-blue-300 rounded-b-2xl flex flex-col items-center py-2 px-2 mt-2">
              <div className="flex items-center gap-2 mb-1">
                <img src="/logo.png" alt="ÇağrıKargo" className="h-6" />
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2 text-[18px] mb-1">
                <a href="#" className="text-cyan-700 hover:text-cyan-900"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-blue-700 hover:text-blue-900"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-pink-600 hover:text-pink-800"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-yellow-700 hover:text-yellow-900"><i className="fab fa-telegram"></i></a>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-cyan-900">
                <span>@CagriKargo</span>
                <span>|</span>
                <span>cagri.gov.tr</span>
                <span>|</span>
                <span>444 1 788</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Eski bilgi kutusu kaldırıldı, modalda gösterilecek */}
    </div>
  );
};

export default TrackingForm;
