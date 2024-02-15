export const calculateTotalPrice = (dailyPrice, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start;
  const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const totalPrice = days * Number(dailyPrice);
  return { totalPrice, days };
};

export const createReservation = async (body, token) => {
  try {
    const res = await fetch("http://localhost:4000/create-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getReservationById = async (id) => {
  try {
    const res = await fetch(`http://localhost:4000/get-reservation/${id}`);

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
