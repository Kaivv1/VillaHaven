/* eslint no-useless-catch: */
import Cookies from "js-cookie";
import moment from "moment-timezone";

export const getToken = () => {
  const token = Cookies.get("access_token");
  return token;
};
const setToken = (newToken) => {
  Cookies.set("access_token", newToken);
};

export const register = async (body) => {
  try {
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (body) => {
  try {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const authorization = res.headers.get("Authorization");

    if (authorization) {
      const newToken = authorization.split(" ")[1];
      setToken(newToken);
    }

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getUserByEmail = async (email) => {
  try {
    const res = await fetch(`http://localhost:4000/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success === false) return;

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserByToken = async (token) => {
  try {
    if (!token) return;
    const res = await fetch(`http://localhost:4000/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserByToken = async (token, body) => {
  try {
    if (!token) return;
    const res = await fetch("http://localhost:4000/updateuser", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendEmail = async (message) => {
  try {
    const res = await fetch("http://localhost:4000/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const generateOTP = async (email) => {
  try {
    const codeResponse = await fetch(
      `http://localhost:4000/generateOTP?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!codeResponse) return;
    const codeData = await codeResponse.json();

    if (codeData.success === false) return;

    const {
      data: { firstName },
    } = await getUserByEmail(email);

    const message = {
      name: firstName,
      userEmail: email,
      text: `Your verification code is ${codeData.code}.`,
      subject: "Password recovery",
    };

    const data = await sendEmail(message);

    if (data.success === false) return;

    return Promise.resolve({ codeData });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const resendOTP = async (email) => {
  try {
    const codeResponse = await fetch(
      `http://localhost:4000/resendOTP?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!codeResponse) return;
    const codeData = await codeResponse.json();

    const {
      data: { firstName },
    } = await getUserByEmail(email);

    const message = {
      name: firstName,
      userEmail: email,
      text: `Your verification code is ${codeData.code}.`,
      subject: "Password recovery",
    };

    await sendEmail(message);

    return Promise.resolve({ codeData });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const deleteOTP = async (email) => {
  try {
    const res = await fetch(`http://localhost:4000/deleteOTP?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await res.json();
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (email, code) => {
  try {
    const res = await fetch(
      `http://localhost:4000/verifyOTP?email=${email}&code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const getSecret = async () => {
  try {
    const res = await fetch("http://localhost:4000/secret");

    const { secret_value } = await res.json();

    return { secret_value };
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email, password) => {
  try {
    const res = await fetch("http://localhost:4000/resetPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (token) => {
  try {
    const res = await fetch("http://localhost:4000/delete-user", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCorrectDate = (date, timezone) => {
  const newDate = moment(date).tz(timezone)?.toDate();
  return newDate;
};
