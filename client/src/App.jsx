import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrackingForm from "./components/TrackingForm";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Kullanıcı sayfası */}
          <Route path="/" element={<TrackingForm />} />

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
