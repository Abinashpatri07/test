import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateLead from "./pages/CreateLead";


function App() {
  const isAuthenticated = localStorage.getItem("auth");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/create-lead" element={isAuthenticated ? <CreateLead /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
