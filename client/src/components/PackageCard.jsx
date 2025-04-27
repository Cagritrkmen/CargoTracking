import { Card, CardContent, Typography, Box, Chip, Tooltip, Button } from "@mui/material";
import { statusOptions } from "../utils/statusOptions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// Statüye göre kart rengi belirle
const getStatusCardColor = (status) => {
  switch (status) {
    case "Hazırlanıyor":
      return "#F97316"; // turuncu
    case "Yola Çıktı":
      return "#3B82F6"; // mavi
    case "Dağıtımda":
      return "#F59E0B"; // sarımsı
    case "Teslim Edildi":
      return "#10B981"; // yeşil
    case "İptal Edildi":
      return "#EF4444"; // kırmızı
    default:
      return "#E5E7EB"; // gri
  }
};

const PackageCard = ({ pkg, onEdit }) => {
  const cardBgColor = getStatusCardColor(pkg.status);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: cardBgColor,
        color: "#fff",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <LocalShippingIcon />
          <Typography variant="h6" noWrap>{pkg.trackingNumber}</Typography>
        </Box>

        <Typography variant="body2">
          <strong>Gönderen:</strong> {pkg.sender}
        </Typography>
        <Typography variant="body2">
          <strong>Alıcı:</strong> {pkg.recipient}
        </Typography>
        <Typography variant="body2">
          <strong>Konum:</strong> {pkg.currentLocation}
        </Typography>

        <Box mt={2}>
          <Tooltip title={statusOptions[pkg.status]?.description || ""}>
            <Chip
              label={`${statusOptions[pkg.status]?.icon || ""} ${pkg.status}`}
              color="default"
              sx={{
                backgroundColor: "#fff",
                color: cardBgColor,
                fontWeight: "bold",
              }}
            />
          </Tooltip>
        </Box>

        <Typography variant="caption" mt={2} display="block">
          Oluşturulma: {new Date(pkg.createdAt).toLocaleDateString("tr-TR")}
        </Typography>
      </CardContent>

      <Box p={2}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#1F2937",
            "&:hover": { backgroundColor: "#374151" },
          }}
          onClick={() => onEdit(pkg)}
        >
          Düzenle
        </Button>
      </Box>
    </Card>
  );
};

export default PackageCard;
