import React, { useContext, createContext, useState, useEffect } from "react";

import {
  fetchFavoriteVillas,
  removeUserFavorite,
  setUserFavorite,
} from "../helpers/villaHelperFunctions";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavoriteVillas = async () => {
      const data = await fetchFavoriteVillas();

      setFavorites(data);
    };

    getFavoriteVillas();
  }, []);

  const addFavorite = async (id) => {
    await setUserFavorite(id);

    const data = await fetchFavoriteVillas();
    setFavorites(data);
  };

  const removeFavorite = async (id) => {
    await removeUserFavorite(id);

    setFavorites((favorites) =>
      favorites.filter((favorite) => favorite._id !== id)
    );
  };

  const checkIsFavorite = (id) => {
    return favorites?.some((favorite) => favorite._id === id);
  };
  return (
    <UserContext.Provider
      value={{ favorites, addFavorite, removeFavorite, checkIsFavorite }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("UserContext was used outside UserProvider");

  return context;
};

export { UserProvider, useUser };
