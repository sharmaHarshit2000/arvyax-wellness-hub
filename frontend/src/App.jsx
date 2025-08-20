import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-sessions"
              element={
                <PrivateRoute>
                  <MySessions />
                </PrivateRoute>
              }
            />
            <Route
              path="/editor"
              element={
                <PrivateRoute>
                  <SessionEditor />
                </PrivateRoute>
              }
            />
            <Route
              path="/editor/:id"
              element={
                <PrivateRoute>
                  <SessionEditor />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
