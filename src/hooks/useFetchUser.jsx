import { useEffect, useState } from "react";
import { getUserByToken } from "../helpers/userHelperFunctions";
import Cookies from "js-cookie";

export const useFetchUser = () => {
  const token = Cookies.get("access_token");
  const [data, setData] = useState({
    isLoading: false,
    user: null,
    error: null,
    token,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        const data = await getUserByToken(token);
        setData((prev) => ({ ...prev, user: data }));
      } catch (error) {
        setData((prev) => ({ ...prev, error }));
      } finally {
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, [token]);
  return data;
};
