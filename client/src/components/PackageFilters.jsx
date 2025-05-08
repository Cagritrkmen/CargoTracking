import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box, IconButton, Tooltip } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { tr } from "date-fns/locale";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

const PackageFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  cityFilter,
  setCityFilter,
  uniqueCities,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onClearFilters
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FilterListIcon sx={{ mr: 1 }} />
        <h3 className="text-lg font-semibold">Filtreler</h3>
        <Tooltip title="Tüm Filtreleri Temizle">
          <IconButton 
            onClick={onClearFilters}
            size="small"
            sx={{ ml: 'auto' }}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={2}>
        {/* Arama Alanı */}
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Takip No veya Alıcı"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: search && (
                <IconButton
                  size="small"
                  onClick={() => setSearch("")}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>

        {/* Durum Filtre */}
        <Grid item xs={12} md={3}>
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
              <MenuItem value="İptal Edildi">İptal Edildi</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Şehir Filtre */}
        <Grid item xs={12} md={3}>
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

        {/* Tarih Aralığı */}
        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
            <DatePicker
              label="Başlangıç Tarihi"
              value={startDate}
              onChange={setStartDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
            <DatePicker
              label="Bitiş Tarihi"
              value={endDate}
              onChange={setEndDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PackageFilters;