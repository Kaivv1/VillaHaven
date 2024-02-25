export const getSecretKey = async () => {
  try {
    const res = await fetch("http://localhost:4000/stripe-secret-key");

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createPaymentIntent = async (villa, reservation, token) => {
  try {
    const res = await fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        villa,
        reservation,
      }),
    });

    const data = await res.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
