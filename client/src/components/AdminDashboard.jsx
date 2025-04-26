import { useEffect, useState } from "react";
import { getAllPackages } from "../api/packageApi";
import EditModal from "./EditModal";
import GeneralStats from "./GeneralStats";
import StatusChart from "./StatusChart";
import CityBarChart from "./CityBarChart";
import PackageFilters from "./PackageFilters";
import { statusOptions } from "../utils/statusOptions";
import WeeklyTrendChart from "./WeeklyTrendChart";
import PackageCard from "./PackageCard";


// MUI
import { Box, Typography, Grid, Card, CardContent, Chip, Tooltip, Button } from "@mui/material";

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

  // Filtreleme işlemi
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

      {packages.length > 0 && (
        <>
          <GeneralStats packages={packages} />

          {/* 3 grafik aynı satırda */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <StatusChart packages={packages} />
            </Grid>
            <Grid item xs={12} md={4}>
              <CityBarChart packages={packages} />
            </Grid>
            <Grid item xs={12} md={4}>
              <WeeklyTrendChart packages={packages} />
            </Grid>
          </Grid>
        </>
      )}



      {/* Filtreleme Alanı */}
      <PackageFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        uniqueCities={uniqueCities}
      />

      {/* Kargo Kartları */}
      <Grid container spacing={2}>
        {filteredPackages.map((pkg) => (
          <Grid item xs={12} md={6} lg={4} key={pkg._id}>
            <PackageCard pkg={pkg} onEdit={handleEditClick} />
          </Grid>
        ))}
      </Grid>


      {/* Modal */}
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
