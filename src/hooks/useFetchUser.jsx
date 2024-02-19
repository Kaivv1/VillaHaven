import { useEffect, useState } from "react";
import { getToken, getUserByToken } from "../helpers/userHelperFunctions";

export const useFetchUser = () => {
  const token = getToken();
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
