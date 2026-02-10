import { createContext, useState, useEffect } from "react";

export const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved?.role) setRole(saved.role);
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

