import { Grid, Card, Typography, Box } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const GeneralStats = ({ packages }) => {
  const total = packages.length;
  const preparing = packages.filter((p) => p.status === "Hazırlanıyor").length;
  const shipped = packages.filter((p) => p.status === "Yola Çıktı").length;
  const delivering = packages.filter((p) => p.status === "Dağıtımda").length;
  const delivered = packages.filter((p) => p.status === "Teslim Edildi").length;
  const cancelled = packages.filter((p) => p.status === "İptal Edildi").length;

  const stats = [
    {
      label: "Toplam",
      count: total,
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      bgColor: "#EA580C",
    },
    {
      label: "Hazırlanıyor",
      count: preparing,
      icon: <Inventory2Icon sx={{ fontSize: 40 }} />,
      bgColor: "#4B5563",
    },
    {
      label: "Yola Çıktı",
      count: shipped,
      icon: <DirectionsRunIcon sx={{ fontSize: 40 }} />,
      bgColor: "#2563EB",
    },
    {
      label: "Dağıtımda",
      count: delivering,
      icon: <LocalMallIcon sx={{ fontSize: 40 }} />,
      bgColor: "#facc15",
    },
    {
      label: "Teslim Edildi",
      count: delivered,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      bgColor: "#10b981",
    },
    {
      label: "İptal Edildi",
      count: cancelled,
      icon: <CancelIcon sx={{ fontSize: 40 }} />,
      bgColor: "#EF4444",
    },
  ];

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" mb={4}>
  {stats.map((stat, index) => (
    <Grid key={index} size={{ xs: 12, sm: 4, md: 4 }}>
      <Card
        sx={{
          backgroundColor: stat.bgColor,
          color: "#fff",
          py: 2,
          px: 1,
          borderRadius: 2,
          textAlign: "center",
          height: "100%",
        }}
      >
        <Box mb={1}>{stat.icon}</Box>
        <Typography variant="subtitle1">{stat.label}</Typography>
        <Typography variant="h6" fontWeight="bold">
          {stat.count}
        </Typography>
      </Card>
    </Grid>
  ))}
</Grid>

  );
};

export default GeneralStats;
