import { useState } from "react";
import { useNavigate } from "react-router";

import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const useApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (
    url,
    method = "GET",
    header = {},
    body,
    location
  ) => {
    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...header },
        body: body && JSON.stringify(body),
      });

      const authorization = res.headers.get("Authorization");

      if (authorization) {
        const newToken = authorization.split(" ")[1];
        Cookies.set("access_token", newToken);
      }
      if (res.ok) setStatus(res.status);
      if (!res.ok) setStatus(res.status);

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        toast.error(data.message);
        setIsLoading(false);
        return;
      }
      setData(data);
      if (location && res.ok) {
        navigate(location);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, status, error, isLoading, fetchData };
};
