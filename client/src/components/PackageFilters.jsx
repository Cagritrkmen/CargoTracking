import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const PackageFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  cityFilter,
  setCityFilter,
  uniqueCities,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {/* Arama Alanı */}
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Takip No veya Alıcı"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>

      {/* Durum Filtre */}
      <Grid item xs={6} md={4}>
        <FormControl fullWidth>
          <InputLabel>Durum</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Durum"
          >
            <MenuItem value="Tümü">Tümü</MenuItem>
            <MenuItem value="Hazırlanıyor">Hazırlanıyor</MenuItem>
            <MenuItem value="Yola Çıktı">Yola Çıktı</MenuItem>
            <MenuItem value="Dağıtımda">Dağıtımda</MenuItem>
            <MenuItem value="Teslim Edildi">Teslim Edildi</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Şehir Filtre */}
      <Grid item xs={6} md={4}>
        <FormControl fullWidth>
          <InputLabel>Şehir</InputLabel>
          <Select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            label="Şehir"
          >
            <MenuItem value="Tümü">Tümü</MenuItem>
            {uniqueCities.map((city, idx) => (
              <MenuItem key={idx} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PackageFilters;
