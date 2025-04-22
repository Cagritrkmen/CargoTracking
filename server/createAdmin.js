const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const username = "cagri";
    const password = "123456";

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log("Admin zaten var");
      return;
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    console.log("✅ Admin başarıyla oluşturuldu!");
    process.exit();
  } catch (err) {
    console.error("Hata oluştu:", err.message);
    process.exit(1);
  }
};

createAdmin();
