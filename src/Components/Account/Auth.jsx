import { createContext, useEffect, useState } from "react";
import { fakeVerifyToken } from "./api";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      const valid = fakeVerifyToken(parsed.token);
      if (valid) setAuth(parsed);
    }
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
  };

  return (
    <Authcontext.Provider value={{ auth, login, logout, updatePassword }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
