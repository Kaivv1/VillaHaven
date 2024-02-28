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

export const deleteImage = async (token) => {
  try {
    const res = await fetch(
      "https://villa-haven-api.vercel.app/delete-user-avatar",
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
    return Promise.reject(error);
  }
};
