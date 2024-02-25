export const getImage = async (imageName) => {
  try {
    const res = await fetch(`http://localhost:4000/get-image/${imageName}`);

    const { imageUrl } = await res.json();

    return Promise.resolve(imageUrl);
  } catch (error) {
    return Promise.reject(error);
  }
};
