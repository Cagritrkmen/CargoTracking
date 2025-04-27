import { useEffect, useState } from "react";
import { getAllPackages } from "../api/packageApi";
import EditModal from "./EditModal";
import GeneralStats from "./GeneralStats";
import StatusChart from "./StatusChart";
import CityBarChart from "./CityBarChart";
import PackageFilters from "./PackageFilters";
import WeeklyTrendChart from "./WeeklyTrendChart";
import PackageCard from "./PackageCard";
import AddPackageModal from "./AddPackageModal";

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
    <Box className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Başlık ve Yeni Kargo Butonu */}
      <Box className="flex justify-between items-center">
        <Typography variant="h4" gutterBottom>
          📦 Admin Panel - Kargolar
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => setIsAddModalOpen(true)}
        >
          ➕ Yeni Kargo Ekle
        </Button>
      </Box>

      {/* Hata mesajı */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Genel İstatistikler */}
      {packages.length > 0 && (
        <GeneralStats packages={packages} />
      )}

      {/* Grafikler */}
      <Box display="flex" justifyContent="space-between" gap={2} flexDirection={{ xs: "column", md: "row" }} >
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
        />
      </Card>

      {/* Kargo Kartları */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
      >
        {filteredPackages.map((pkg) => (
          <Box
            key={pkg._id}
            sx={{
              width: "300px", // SABİT GENİŞLİK
              flexShrink: 0,   // Daralmayı engelle
            }}
          >
            <PackageCard pkg={pkg} onEdit={handleEditClick} />
          </Box>
        ))}
      </Box>


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
  );
};

export default AdminDashboard;
