const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Geçersiz kullanıcı adı" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Geçersiz şifre" });

    const token = generateToken(admin._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = { loginAdmin };
