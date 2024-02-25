import { getToken } from "./userHelperFunctions";

export const fetchVillas = async () => {
  try {
    const res = await fetch("http://localhost:4000/get-villas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVillaById = async (villaID) => {
  try {
    const res = await fetch(`http://localhost:4000/villa/${villaID}`);

    const data = await res.json();
    if (data === false) return;

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateVillaById = async (id, body) => {
  try {
    const res = await fetch(`http://localhost:4000/update-villa/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addNewVillaReservedDates = async (id, reservedDates) => {
  try {
    const res = await fetch(`http://localhost:4000/add-reserved-dates/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservedDates),
    });

    const data = res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchFavoriteVillas = async () => {
  try {
    const token = getToken();
    if (!token) return;
    const res = await fetch("http://localhost:4000/get-user-favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return;

    const data = await res.json();
    if (data.sucess && data.success === false) {
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const setUserFavorite = async (id) => {
  try {
    const token = await getToken();
    if (!token) return;
    const res = await fetch(`http://localhost:4000/set-favorite-villa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeUserFavorite = async (id) => {
  try {
    const token = await getToken();
    if (!token) return;
    const res = await fetch(
      `http://localhost:4000/remove-favorite-villa/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMainPicture = (pictures) => {
  return pictures?.filter((picture) => picture.includes("main-")).join("");
};
