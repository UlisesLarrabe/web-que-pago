import AddIcon from "@/icons/AddIcon";

const AddSubButton = ({ setIsVisible }) => {
  return (
    <button
      onClick={() => setIsVisible(true)}
      className="flex justify-center items-center p-4 border-2 border-dashed rounded-lg max-w-6xl w-full border-gray-500 text-gray-500 hover:border-white hover:text-white"
    >
      <AddIcon />
    </button>
  );
};
export default AddSubButton;
