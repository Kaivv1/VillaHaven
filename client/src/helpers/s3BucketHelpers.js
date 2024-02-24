export const getImage = async (imageName) => {
  try {
    const res = await fetch(
      `https://villa-haven-api.vercel.app/get-image/${imageName}`
    );

    const { imageUrl } = await res.json();

    return Promise.resolve(imageUrl);
  } catch (error) {
    return Promise.reject(error);
  }
};
