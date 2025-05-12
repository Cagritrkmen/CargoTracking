import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
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
        </Routes>
      </Router>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
