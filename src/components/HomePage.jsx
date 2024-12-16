"use client";
import { useUserContext } from "@/context/userContext";
import Greetings from "./Greetings";
import ListOfSubs from "./ListOfSubs";
import { useEffect } from "react";
import Loader from "./Loader";
import PreFooter from "./PreFooter";
import Footer from "./Footer";

export const HomePage = ({ user: userProps }) => {
  const { user, setUser, getListsOfSubs } = useUserContext();

  useEffect(() => {
    setUser(userProps);
    getListsOfSubs(userProps);
  }, []);

  return (
    <section className=" min-h-screen h-full p-2 absolute top-0 z-[-2]  w-screen  flex  items-center flex-col">
      {user ? (
        <>
          <Greetings user={user} />
          <ListOfSubs user={user} />
          <PreFooter />
          <Footer />
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Loader />
          <h2 className="text-xl">Cargando...</h2>
        </div>
      )}
    </section>
  );
};
