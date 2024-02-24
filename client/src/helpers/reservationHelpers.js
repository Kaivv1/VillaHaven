export const calculateTotalPrice = (dailyPrice, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  end.setDate(end.getDate() + 1);

  const timeDifference = end - start;
  const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const totalPrice = days * Number(dailyPrice);

  return { totalPrice, days };
};

export const checkIsAvailable = async (check) => {
  const res = await fetch(
    "https://villahaven.onrender.com/check-availability",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chosenDates: check.chosenDates,
        villaId: check.villaId,
      }),
    }
  );

  const { isAvailable } = await res.json();

  return Promise.resolve(isAvailable);
};

export const checkAvailability = async (reservedDates, villaId) => {
  const check = {
    chosenDates: {
      startDate: reservedDates.startDate,
      endDate: reservedDates.endDate,
    },
    villaId,
  };
  const isAvailable = await checkIsAvailable(check);

  return isAvailable;
};

export const createReservation = async (body, token) => {
  try {
    const res = await fetch(
      "https://villahaven.onrender.com/create-reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getReservationById = async (id) => {
  try {
    const res = await fetch(
      `https://villahaven.onrender.com/get-reservation/${id}`
    );

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUserReservations = async (token) => {
  try {
    const res = await fetch(
      "https://villahaven.onrender.com/get-user-reservations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteReservationById = async (token, id) => {
  try {
    const res = await fetch(
      `https://villahaven.onrender.com/delete-reservation/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    return Promise.resolve(data);
  } catch (error) {
    Promise.reject(error);
  }
};
