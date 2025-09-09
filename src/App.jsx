import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ChatProvider } from "./context/ChatProvider";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import GroupRoom from "./pages/GroupRoom";
import { useAuth } from "./context/useAuth";

// Protected Layout Component
const AuthenticatedLayout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

import { ToastProvider } from "./components/ToastProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ChatProvider>
          <ToastProvider />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <AuthenticatedLayout>
                  <Home />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/chat/:id"
              element={
                <AuthenticatedLayout>
                  <ChatRoom />
                </AuthenticatedLayout>
              }
            />
            <Route
              path="/group/:id"
              element={
                <AuthenticatedLayout>
                  <GroupRoom />
                </AuthenticatedLayout>
              }
            />
          </Routes>
        </ChatProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
