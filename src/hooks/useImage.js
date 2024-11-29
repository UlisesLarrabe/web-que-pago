import { IMAGES } from "@/utils/images";
import { useEffect, useState } from "react";

export const useImage = (nameImage) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (IMAGES[nameImage]) {
      return setImage(IMAGES[nameImage]);
    }
    setImage("logos/default-image.webp");
  }, [nameImage]);

  return { image };
};
