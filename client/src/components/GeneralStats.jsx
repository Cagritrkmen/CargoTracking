import { Box, Card, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GeneralStats = ({ packages }) => {
  const total = packages.length;
  const preparing = packages.filter((p) => p.status === "Hazırlanıyor").length;
  const shipped = packages.filter((p) => p.status === "Yola Çıktı").length;
  const delivering = packages.filter((p) => p.status === "Dağıtımda").length;
  const delivered = packages.filter((p) => p.status === "Teslim Edildi").length;

  const stats = [
    {
      label: "Toplam",
      count: total,
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      bgColor: "#EA580C", // gri
    },
    {
      label: "Hazırlanıyor",
      count: preparing,
      icon: <Inventory2Icon sx={{ fontSize: 40 }} />,
      bgColor: "#4B5563", // turuncu
    },
    {
      label: "Yola Çıktı",
      count: shipped,
      icon: <DirectionsRunIcon sx={{ fontSize: 40 }} />,
      bgColor: "#2563EB", // mavi
    },
    {
      label: "Dağıtımda",
      count: delivering,
      icon: <LocalMallIcon sx={{ fontSize: 40 }} />,
      bgColor: "#facc15", // sarımsı
    },
    {
      label: "Teslim Edildi",
      count: delivered,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      bgColor: "#10b981", // yeşil
    },
  ];

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          sx={{
            flex: "1 1 180px",
            maxWidth: "200px",
            backgroundColor: stat.bgColor,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 2,
            px: 1,
            borderRadius: 2,
          }}
        >
          <Box mb={1}>{stat.icon}</Box>
          <Typography variant="subtitle1">{stat.label}</Typography>
          <Typography variant="h6" fontWeight="bold">
            {stat.count}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default GeneralStats;
