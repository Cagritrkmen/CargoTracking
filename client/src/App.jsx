import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrackingForm from "./components/TrackingForm";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
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
  );
}

export default App;
