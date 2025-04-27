import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const CityBarChart = ({ packages }) => {
  if (!packages || packages.length === 0) return null;

  // Şehirlere göre grupla
  const grouped = packages.reduce((acc, pkg) => {
    acc[pkg.currentLocation] = (acc[pkg.currentLocation] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <Card sx={{ width:"100%", mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Şehre Göre Kargo Dağılımı
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="city" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Kargo Sayısı" />
            </BarChart>
          </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CityBarChart;
