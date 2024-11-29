import { ARRAY_IMAGES } from "@/utils/images";

const ImagesMap = ({ handleInput }) => {
  return (
    <>
      {ARRAY_IMAGES.map((image) => {
        return (
          <label
            key={image}
            className="flex flex-col gap-1 peer-checked:border-blue-500"
          >
            <input
              type="radio"
              name="company"
              value={image.split("/")[1].split(".")[0]}
              onChange={handleInput}
              hidden
              className="peer"
            />
            <img
              src={image}
              alt={image}
              className="h-20 w-20 object-cover peer-checked:border-blue-500 peer-checked:border-4 cursor-pointer"
            />
          </label>
        );
      })}
    </>
  );
};
export default ImagesMap;
