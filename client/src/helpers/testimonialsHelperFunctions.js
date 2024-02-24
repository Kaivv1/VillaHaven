export const getTestimonials = async () => {
  try {
    const res = await fetch(
      "https://villahaven.onrender.com/get-testimonials",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) return;

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
