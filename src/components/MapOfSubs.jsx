import AddSubButton from "./AddSubButton";
import SubCard from "./SubCard";

const MapOfSubs = ({ subs, text, setIsVisible, showAdd }) => {
  return (
    <>
      <h2
        className={` text-2xl font-bold text-center  ${
          showAdd ? "text-red-300" : "text-green-300"
        } `}
      >
        {text}
      </h2>
      <div className=" gap-4 p-4 w-full flex justify-center items-center flex-col ">
        {subs?.map((sub) => {
          return <SubCard key={sub._id} sub={sub} />;
        })}
        {showAdd && <AddSubButton setIsVisible={setIsVisible} />}
      </div>
    </>
  );
};
export default MapOfSubs;
