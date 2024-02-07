import Cookies from "js-cookie";

export const getToken = async () => {
  const token = Cookies.get("access_token");

  return token;
};

export const fetchVillas = async () => {
  try {
    const res = await fetch("http://localhost:4000/getvillas", {
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

export const fetchFavoriteVillas = async () => {
  try {
    const token = await getToken();
    if (!token) return;
    const res = await fetch("http://localhost:4000/getuserfavorites", {
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
    const res = await fetch(`http://localhost:4000/setfavoritevilla/${id}`, {
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
    const res = await fetch(`http://localhost:4000/removefavoritevilla/${id}`, {
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
