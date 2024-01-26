/* eslint no-useless-catch: */

export const getUser = async (email) => {
  try {
    const res = await fetch(`http://localhost:4000/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success === false) return;

    return data;
  } catch (error) {
    throw error;
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
    const codeData = await codeResponse.json();

    if (codeData.success === false) return;

    const {
      data: { firstName },
    } = await getUser(email);

    const messageData = {
      name: firstName,
      userEmail: email,
      text: `Your verification code is ${codeData.code}.`,
      subject: "Password recovery",
    };

    const emailResponse = await fetch("http://localhost:4000/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });
    const data = await emailResponse.json();

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

    const codeData = await codeResponse.json();

    const {
      data: { firstName },
    } = await getUser(email);

    const messageData = {
      name: firstName,
      userEmail: email,
      text: `Your verification code is ${codeData.code}.`,
      subject: "Password recovery",
    };

    const emailResponse = await fetch("http://localhost:4000/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });
    await emailResponse.json();

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
