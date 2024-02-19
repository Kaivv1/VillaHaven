import { useEffect, useState } from "react";
import { getImage } from "../helpers/s3BucketHelpers";

export const useFetchImage = (fileName) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImage(fileName);
      setImageUrl(image);
    };

    fetchImage();
  }, [fileName]);

  return imageUrl;
};
