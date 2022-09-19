import React, { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // const [isAuthorized, setIsAuthorized]
  const value = { isAuthorized: true };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
}

export default UserContext;
