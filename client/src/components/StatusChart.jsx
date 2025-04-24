import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import { Card, CardContent, Typography } from "@mui/material";
  import { statusOptions } from "../utils/statusOptions";
  
  const StatusChart = ({ packages }) => {
    if (!packages || packages.length === 0) return null;
  
    const grouped = packages.reduce((acc, pkg) => {
      acc[pkg.status] = (acc[pkg.status] || 0) + 1;
      return acc;
    }, {});
  
    const data = Object.entries(grouped).map(([status, count]) => ({
      name: `${status} (${count})`,
      value: count,
      color: statusOptions[status]?.colorCode || "#ccc",
    }));
  
    return (
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Kargo Durum Dağılımı
          </Typography>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default StatusChart;
  