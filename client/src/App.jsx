import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Kullanıcı ana sayfası */}
          <Route path="/" element={<Home />} />

          {/* Admin login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Admin panel - token korumalı */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
