import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/adminApi";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginAdmin({ username, password });
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Giriş başarısız: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100">
      {/* Arka plan görseli ve yarı saydam katman */}
      <Box
        component="img"
        src="/bg.png"
        alt="Kargo Görevlisi ve Kargomat"
        className="fixed inset-0 w-full h-full object-cover z-0"
        sx={{ pointerEvents: "none" }}
      />
      <Box className="absolute inset-0 bg-white bg-opacity-40 z-10" />
      <Paper
        elevation={8}
        component="form"
        onSubmit={handleLogin}
        aria-label="Admin Giriş Formu"
        sx={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: 420,
          backgroundColor: '#2196f3',
          border: '8px solid #FFD600',
          p: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: 5,
          gap: 3,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Logo ve başlık */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mb: 1 }}>
          <Box sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2, px: 3, py: 1, mb: 2, boxShadow: 2, minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box component="img" src="/logo.png" alt="Çağrı Kargo Logo" sx={{ width: 140, height: 48, objectFit: 'contain' }} />
          </Box>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 0.5, textShadow: '0 2px 8px #0002' }}>Admin Panel Girişi</Typography>
          <Typography sx={{ color: '#e3f2fd', fontSize: 16, mb: 1 }}>Hoş geldiniz! Lütfen giriş bilgilerinizi girin.</Typography>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'left' }}>
          <Typography sx={{ color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 16 }}>Kullanıcı Adı</Typography>
          <TextField
            margin="0"
            id="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            autoComplete="username"

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="warning" />
                </InputAdornment>
              ),
              style: {
                background: '#fff',
                borderRadius: 8,
              },
            }}
          />
        </Box>
        <Box sx={{ width: '100%', textAlign: 'left', mt: 1 }}>
          <Typography sx={{ color: '#fff', fontWeight: 600, mb: 0.5, fontSize: 16 }}>Şifre</Typography>
          <TextField
            id="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            autoComplete="current-password"
            margin="0"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="warning" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                    onClick={() => setShowPassword((v) => !v)}
                    edge="end"
                    tabIndex={0}
                  >
                    {showPassword ? <VisibilityOff color="warning" /> : <Visibility color="warning" />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                background: '#fff',
                borderRadius: 8,
              },
            }}
          />
        </Box>
        {error && (
          <FormHelperText error sx={{ width: '100%', background: 'rgba(244,67,54,0.95)', color: '#fffde7', borderRadius: 2, p: 1, fontWeight: 600, textAlign: 'center', mt: 1, mb: 1, fontSize: 15, boxShadow: 2 }}>
            {error}
          </FormHelperText>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-4"
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
          )}
          GİRİŞ YAP
        </button>
      </Paper>
    </Box>
  );
};

export default AdminLogin; 