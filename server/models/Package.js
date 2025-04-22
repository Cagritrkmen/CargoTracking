const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  currentLocation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Preparing'
  },
  history: [
    {
      location: String,
      status: String,      // ✅ Bunu ekledik
      date: Date
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
