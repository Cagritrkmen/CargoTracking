import { useEffect, useState } from "react";
import { getAllPackages } from "../api/packageApi";
import EditModal from "../components/EditModal";
import GeneralStats from "../components/GeneralStats";
import StatusChart from "../components/StatusChart";
import CityBarChart from "../components/CityBarChart";
import PackageFilters from "../components/PackageFilters";
import WeeklyTrendChart from "../components/WeeklyTrendChart";
import PackageCard from "../components/PackageCard";
import AddPackageModal from "../components/AddPackageModal";
import logo from "../../public/logo.png";
import AddIcon from '@mui/icons-material/Add';

// MUI
import { Box, Typography, Grid, Card, Button } from "@mui/material";

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [error, setError] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filtre state'leri
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [cityFilter, setCityFilter] = useState("Tümü");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Kargo verisi çekme
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

  // Tüm filtreleri temizle
  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("Tümü");
    setCityFilter("Tümü");
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    const result = packages.filter((pkg) => {
      const searchMatch =
        pkg.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        pkg.recipient?.toLowerCase().includes(search.toLowerCase()) ||
        pkg.sender?.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "Tümü" || pkg.status === statusFilter;

      const cityMatch =
        cityFilter === "Tümü" || pkg.currentLocation === cityFilter;

      // Tarih kontrolü
      const packageDate = new Date(pkg.createdAt);
      const dateMatch = (!startDate || packageDate >= startDate) && 
                       (!endDate || packageDate <= endDate);

      return searchMatch && statusMatch && cityMatch && dateMatch;
    });

    setFilteredPackages(result);
  }, [search, statusFilter, cityFilter, startDate, endDate, packages]);

  const handleEditClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const uniqueCities = [...new Set(packages.map((p) => p.currentLocation))].filter(Boolean);

  return (
    <Box className="min-h-screen w-full bg-gradient-to-br from-yellow-100 to-blue-100">
      <Box className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Başlık ve Yeni Kargo Butonu */}
        <Box className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-2 pt-4">
          <Box className="flex items-center gap-3">
            <img src={logo} alt="Çağrı Kargo Logo" className="h-12 w-auto object-contain" />
            <Typography variant="h4" className="font-bold text-cyan-900 tracking-tight" sx={{ fontSize: { xs: 24, sm: 32, md: 38 } }}>
              Admin Panel
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)}
            sx={{
              background: 'linear-gradient(90deg, #FFD600 60%, #2196f3 100%)',
              color: '#1F2937',
              fontWeight: 700,
              fontSize: { xs: 16, sm: 18 },
              borderRadius: 9999,
              px: 4,
              py: 1.5,
              boxShadow: 3,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #ffe066 60%, #1976d2 100%)',
                color: '#1F2937',
              },
            }}
          >
            Yeni Kargo Ekle
          </Button>
        </Box>

        {/* Hata mesajı */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Genel İstatistikler */}
        {packages.length > 0 && (
          <GeneralStats packages={packages} />
        )}

        {/* Grafikler */}
        <Box display="flex" justifyContent="space-between" gap={3} flexDirection={{ xs: "column", md: "row" }} >
          <Box flex="1" minWidth={300}>
            <StatusChart packages={packages} />
          </Box>
          <Box flex="1" minWidth={300}>
            <CityBarChart packages={packages} />
          </Box>
          <Box flex="1" minWidth={300}>
            <WeeklyTrendChart packages={packages} />
          </Box>
        </Box>

        {/* Filtre Alanı */}
        <Card className="p-4">
          <PackageFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            cityFilter={cityFilter}
            setCityFilter={setCityFilter}
            uniqueCities={uniqueCities}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onClearFilters={handleClearFilters}
          />
        </Card>

        {/* Kargo Kartları */}
        <Grid
          container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }}  mb={4} justifyContent="flex-start"
        >
          {filteredPackages.map((pkg) => (
            <Grid
             size={{ xs: 12, sm: 4, md: 3 }}
              sx={{
                width: "100%", px: 0,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                py: 2,
              }}
            >
              <PackageCard pkg={pkg} onEdit={handleEditClick} />
            </Grid>
          ))}
        </Grid>

        {/* Düzenleme Modali */}
        {selectedPackage && (
          <EditModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            pkg={selectedPackage}
            onUpdated={fetchPackages}
          />
        )}

        {/* Yeni Kargo Ekleme Modali */}
        {isAddModalOpen && (
          <AddPackageModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onCreated={fetchPackages}
          />
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard; 