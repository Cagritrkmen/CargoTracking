const Package = require("../models/Package");



const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: "Kargolar getirilemedi" });
  }
};

// 🔍 Sorgu
const getPackageByTrackingNumber = async (req, res) => {
  try {
    const pkg = await Package.findOne({ trackingNumber: req.params.trackingNumber });
    if (!pkg) return res.status(404).json({ message: "Kargo bulunamadı" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// ➕ Ekleme
const createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: "Hata oluştu", error: err.message });
  }
};
const updatePackageByTrackingNumber = async (req, res) => {
  try {
    const { currentLocation, status } = req.body;
    console.log("🟡 Gelen veri:", { currentLocation, status });

    const pkg = await Package.findOne({ trackingNumber: req.params.trackingNumber });
    if (!pkg) {
      console.log("🔴 Kargo bulunamadı");
      return res.status(404).json({ message: "Kargo bulunamadı" });
    }

    console.log("🟢 Bulunan kargo:", pkg);

    // Güncellemeleri uygula
    if (currentLocation) pkg.currentLocation = currentLocation;
    if (status) pkg.status = status;

    // History kontrolü
    if (!Array.isArray(pkg.history)) {
      console.log("🟡 History alanı yok, oluşturuluyor...");
      pkg.history = [];
    }

    console.log("🟡 History push öncesi:", pkg.history);

    pkg.history.push({
      location: currentLocation || pkg.currentLocation,
      status: status || pkg.status,
      date: new Date()
    });

    console.log("✅ History push sonrası:", pkg.history);

    await pkg.save();
    console.log("✅ Kargo başarıyla güncellendi");

    res.json(pkg);
  } catch (err) {
    console.error("❌ HATA:", err.message);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};


// ❌ Silme (trackingNumber)
const deletePackageByTrackingNumber = async (req, res) => {
  try {
    const pkg = await Package.findOneAndDelete({
      trackingNumber: req.params.trackingNumber
    });
    if (!pkg) return res.status(404).json({ message: "Kargo bulunamadı" });
    res.json({ message: "Kargo silindi" });
  } catch (err) {
    res.status(500).json({ message: "Silme hatası", error: err.message });
  }
};

module.exports = {
  createPackage,
  getPackageByTrackingNumber,
  updatePackageByTrackingNumber,
  deletePackageByTrackingNumber,
  getAllPackages,
};
