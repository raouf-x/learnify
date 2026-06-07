import { createContext, useContext, useState, useEffect } from 'react';

import { loginUser, registerUser, getMe } from '../api';

// Create the context
const AuthContext = createContext();

// Provider component — wraps the whole app
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Load user on app start if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const data = await getMe(token);
          if (data._id) {
            setUser(data);
          } else {
            // Token invalid — clear it
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data);
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  // Register function
  const register = async (name, email, password, role) => {
    const data = await registerUser({ name, email, password, role });
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data);
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;