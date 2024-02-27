export const getTestimonials = async () => {
  try {
    const res = await fetch(
      "https://villa-haven-api.vercel.app//get-testimonials",
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
