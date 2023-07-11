import React, { createContext, useContext, useState, useEffect } from "react";

export type Identity = {
  userId: string;
} | null;

type IdentityProviderProps = {
  children: React.ReactNode;
};

export const fetchIdentity = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/identity");
    if (!response.ok) {
      throw new Error("Failed to fetch identity data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch identity data");
  }
};

export const IdentityContext = createContext<Identity>(null);

export const IdentityProvider: React.FC<IdentityProviderProps> = ({
  children,
}) => {
  const [identity, setIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    // Fetch the user identity from the API endpoint
    const getAndSetIdentity = () => {
      fetchIdentity().then((identity) => setIdentity(identity));
    };

    getAndSetIdentity();
  }, []);

  const value: Identity = identity;

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentity = (): Identity => useContext(IdentityContext);
