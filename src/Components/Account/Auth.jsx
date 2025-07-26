import { createContext, useEffect, useState } from "react";
import { fakeVerifyToken } from "./api";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");

    const verifyStoredToken = async () => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const isValid = await fakeVerifyToken(parsed.token);
          if (isValid) {
            setAuth(parsed);
          } else {
            localStorage.removeItem("auth");
          }
        } catch (err) {
          console.error("Failed to parse or verify auth:", err);
          localStorage.removeItem("auth");
        }
      }
      setLoading(false);
    };

    verifyStoredToken();
  }, []);

  const login = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  const updatePassword = (newPassword) => {
    if (!auth?.user?.email) return false;

    const updated = {
      ...auth,
      user: { ...auth.user, password: newPassword },
    };

    localStorage.setItem("auth", JSON.stringify(updated));
    setAuth(updated);
    return true;
  };

  if (loading) return null; // أو Spinner مؤقت

  return (
    <Authcontext.Provider value={{ auth, login, logout, updatePassword }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
