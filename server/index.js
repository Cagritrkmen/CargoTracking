const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const packageRoutes = require('./routes/packageRoutes');
app.use('/api/packages', packageRoutes);

app.get('/', (req, res) => {
    res.send('API Çalışıyor!');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Sunucu ${PORT} portunda çalışıyor`);
        });
    })
    .catch(err => console.error(err));
