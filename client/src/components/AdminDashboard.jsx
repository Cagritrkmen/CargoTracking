import { useEffect, useState } from "react";
import { getAllPackages } from "../api/packageApi";
import EditModal from "./EditModal";

// MUI bileşenleri
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [error, setError] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtre state'leri
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [cityFilter, setCityFilter] = useState("Tümü");

  // Veri çekme
  const fetchPackages = async () => {
    try {
      const data = await getAllPackages();
      setPackages(data);
    } catch (err) {
      setError("Kargolar getirilemedi: " + err.message);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Filtreleme
  useEffect(() => {
    const result = packages.filter((pkg) => {
      const searchMatch =
        pkg.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        pkg.recipient?.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "Tümü" || pkg.status === statusFilter;

      const cityMatch =
        cityFilter === "Tümü" || pkg.currentLocation === cityFilter;

      return searchMatch && statusMatch && cityMatch;
    });

    setFilteredPackages(result);
  }, [search, statusFilter, cityFilter, packages]);

  // Modal işlemleri
  const handleEditClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  // Şehir listesi
  const uniqueCities = [...new Set(packages.map((p) => p.currentLocation))].filter(Boolean);

  return (
    <Box className="bg-gray-100 min-h-screen px-6 py-8">
      <Typography variant="h4" gutterBottom>
        📦 Admin Panel - Kargolar
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {/* Filtre UI */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Takip No veya Alıcı"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Durum</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Durum"
            >
              <MenuItem value="Tümü">Tümü</MenuItem>
              <MenuItem value="Hazırlanıyor">Hazırlanıyor</MenuItem>
              <MenuItem value="Yola Çıktı">Yola Çıktı</MenuItem>
              <MenuItem value="Dağıtımda">Dağıtımda</MenuItem>
              <MenuItem value="Teslim Edildi">Teslim Edildi</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Şehir</InputLabel>
            <Select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              label="Şehir"
            >
              <MenuItem value="Tümü">Tümü</MenuItem>
              {uniqueCities.map((city, idx) => (
                <MenuItem key={idx} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Kargo kartları */}
      <Grid container spacing={2}>
        {filteredPackages.map((pkg) => (
          <Grid item xs={12} md={6} lg={4} key={pkg._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{pkg.trackingNumber}</Typography>
                <Typography>Konum: {pkg.currentLocation}</Typography>
                <Typography>Durum: {pkg.status}</Typography>
                <Box mt={2}>
                  <Button
                    onClick={() => handleEditClick(pkg)}
                    variant="contained"
                    color="primary"
                  >
                    Düzenle
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal göster */}
      {selectedPackage && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          pkg={selectedPackage}
          onUpdated={fetchPackages}
        />
      )}
    </Box>
  );
};

export default AdminDashboard;
