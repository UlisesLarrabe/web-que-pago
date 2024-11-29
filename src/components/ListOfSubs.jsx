"use client";
import AddSub from "./AddSub";
import { useState } from "react";
import { useUserContext } from "@/context/userContext";
import MapOfSubs from "./MapOfSubs";

const ListOfSubs = ({ user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { paidSubs, subsToPay } = useUserContext();

  return (
    <main className={"w-full flex flex-col items-center relative"}>
      <AddSub isVisible={isVisible} setIsVisible={setIsVisible} user={user} />
      <section
        className={`pt-14 w-full flex flex-col items-center ${
          isVisible && "opacity-50 pointer-events-none"
        }`}
      >
        <MapOfSubs
          text="Tus suscripciones pendientes de pago"
          subs={subsToPay}
          setIsVisible={setIsVisible}
          showAdd={true}
        />
        {paidSubs?.length > 0 && (
          <MapOfSubs
            text="Tus suscripciones pagadas"
            subs={paidSubs}
            setIsVisible={setIsVisible}
            showAdd={false}
          />
        )}
      </section>
    </main>
  );
};
export default ListOfSubs;
