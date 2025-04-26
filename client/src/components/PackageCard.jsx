import { Card, CardContent, Typography, Box, Chip, Tooltip, Button } from "@mui/material";
import { statusOptions } from "../utils/statusOptions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const PackageCard = ({ pkg, onEdit }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <LocalShippingIcon color="primary" />
          <Typography variant="h6" noWrap>{pkg.trackingNumber}</Typography>
        </Box>

        <Typography variant="body2" color="textSecondary">
          <strong>Gönderen:</strong> {pkg.sender}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Alıcı:</strong> {pkg.recipient}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Konum:</strong> {pkg.currentLocation}
        </Typography>

        <Box mt={2}>
          <Tooltip title={statusOptions[pkg.status]?.description || ""}>
            <Chip
              label={`${statusOptions[pkg.status]?.icon || ""} ${pkg.status}`}
              color={statusOptions[pkg.status]?.color || "default"}
              variant="filled"
            />
          </Tooltip>
        </Box>

        <Typography variant="caption" color="textSecondary" mt={2} display="block">
          Oluşturulma: {new Date(pkg.createdAt).toLocaleDateString("tr-TR")}
        </Typography>
      </CardContent>

      <Box p={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onEdit(pkg)}
        >
          Düzenle
        </Button>
      </Box>
    </Card>
  );
};

export default PackageCard;
