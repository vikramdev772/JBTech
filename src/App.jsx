import { useState, useEffect } from "react";
import Router from "./routes/Router";
import Main from "./pages/Main";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (e.g., from localStorage)
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // You might want to store the token here
    // localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear stored token
    localStorage.removeItem('token');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Main onLogout={handleLogout} />
      ) : (
        <Router onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;