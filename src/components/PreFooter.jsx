"use client";

import { useUserContext } from "@/context/userContext";
import { useState } from "react";

const PreFooter = () => {
  const { resetSubs, user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    try {
      setIsLoading(true);
      resetSubs(user.subsList._id).then(() => {
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };
  return (
    <section className="absolute bottom-20 left-5">
      <button
        onClick={() => handleReset()}
        disabled={isLoading}
        className="bg-red-300 text-gray-800 p-2 rounded-lg hover:bg-red-400"
      >
        {isLoading ? "Cargando..." : "Resetear suscripciones"}
      </button>
    </section>
  );
};
export default PreFooter;
