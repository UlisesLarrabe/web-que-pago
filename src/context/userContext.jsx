"use client";
import { API_URL } from "@/utils/api";
import { createContext, useContext, useState } from "react";

const context = createContext();
export const useUserContext = () => {
  const c = useContext(context);
  if (!c) throw new Error("useUserContext must be used within a UserProvider");
  return c;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [paidSubs, setPaidSubs] = useState([]);
  const [subsToPay, setSubsToPay] = useState([]);

  const getListsOfSubs = (user) => {
    const subs = user?.subsList?.subs;
    const paid = subs?.filter((sub) => sub.isPaid === "true");
    const toPay = subs?.filter((sub) => sub.isPaid === "false");
    setPaidSubs(paid);
    setSubsToPay(toPay);
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/getUser`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
      getListsOfSubs(data);
      return { status: response.status };
    } catch (error) {
      console.error(error.message);
    }
  };

  const addSub = async (newSub, id) => {
    try {
      await fetch(`${API_URL}/api/subs/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSub),
      });
      await getUser();
      return { success: true };
    } catch (error) {
      console.error(error.message);
    }
  };

  const editSub = async (newSub, idList, idSub) => {
    try {
      await fetch(`${API_URL}/api/subs/${idList}/${idSub}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSub),
      });
      await getUser();
      return { success: true };
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSub = async (idList, idSub) => {
    try {
      await fetch(`${API_URL}/api/subs/${idList}/${idSub}`, {
        method: "DELETE",
        credentials: "include",
      });
      await getUser();
      return { success: true };
    } catch (error) {
      console.error(error);
    }
  };

  const resetSubs = async (id) => {
    try {
      await fetch(`${API_URL}/api/subs/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      await getUser();
      return { success: true };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <context.Provider
      value={{
        user,
        setUser,
        getUser,
        addSub,
        editSub,
        paidSubs,
        subsToPay,
        deleteSub,
        resetSubs,
      }}
    >
      {children}
    </context.Provider>
  );
};
