const express = require("express");
const router = express.Router();
const {
  createPackage,
  getPackageByTrackingNumber,
  updatePackageByTrackingNumber,
  deletePackageByTrackingNumber
} = require("../controllers/packageController");

const verifyToken = require("../middleware/authMiddleware");

// 🔍 Takip numarasıyla sorgulama
router.get("/:trackingNumber", getPackageByTrackingNumber);

// 📦 Yeni kargo oluşturma (token korumalı)
router.post("/", verifyToken, createPackage);

// ✏️ Takip numarası ile güncelleme (token korumalı)
router.put("/track/:trackingNumber", verifyToken, updatePackageByTrackingNumber);

// ❌ Takip numarası ile silme (token korumalı)
router.delete("/track/:trackingNumber", verifyToken, deletePackageByTrackingNumber);

module.exports = router;
