import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const WeeklyTrendChart = ({ packages }) => {
  if (!packages || packages.length === 0) return null;

  // Tarihe göre gruplama
  const grouped = packages.reduce((acc, pkg) => {
    const date = format(new Date(pkg.createdAt), "yyyy-MM-dd", { locale: tr });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, count]) => ({ date, count }));

  return (
    <Card sx={{ width: "100%", mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Haftalık Gönderi Trend Analizi
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#4F46E5" name="Gönderi Sayısı" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyTrendChart;
