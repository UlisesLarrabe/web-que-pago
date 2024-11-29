"use client";
import { useImage } from "@/hooks/useImage";
import ClockIcon from "@/icons/ClockIcon";
import dayjs from "dayjs";
import AddSub from "./AddSub";
import { useState } from "react";

const SubCard = ({ sub }) => {
  const expiresOn = dayjs(sub.expiresOn);
  const { image } = useImage(sub.company);
  const [isVisible, setIsVisible] = useState(false);
  const day = expiresOn.get("date");
  const dayToday = dayjs().get("date");
  const hasTime = day - dayToday > 0;
  const warning = `Faltan ${day - dayToday} dia/s`;

  return (
    <>
      <AddSub
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isEditable={true}
        sub={sub}
      />
      <article className="flex justify-between items-center p-4 bg-neutral-800 rounded-lg max-w-6xl w-full ">
        <main className="flex items-center gap-2">
          <img
            src={image}
            alt="Company logo"
            className="w-[50px] h-[50px] object-cover"
          />
          <div>
            <h3 className="text-lg font-bold text-white">{sub.title}</h3>
            <div
              className={`flex gap-1 ${
                hasTime || sub.isPaid === "true"
                  ? "text-gray-400"
                  : "text-red-200"
              } w-[150px]`}
            >
              <ClockIcon />
              <p>
                {hasTime
                  ? warning
                  : `${expiresOn.format("DD")}/
                ${dayjs().get("month") + 1}`}
              </p>
            </div>
          </div>
        </main>
        <div>
          <p className="text-white font-bold md:text-lg">
            ${sub.price.value} {sub.price.currency}
          </p>
          <div className="flex gap-1">
            {sub.isPaid === "true" ? (
              <p className="text-green-300">Pagado</p>
            ) : (
              <p className="text-red-300">Pendiente de pago</p>
            )}
          </div>
        </div>
        <button
          className="bg-primary-500 text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => setIsVisible(true)}
        >
          Editar
        </button>
      </article>
    </>
  );
};
export default SubCard;
