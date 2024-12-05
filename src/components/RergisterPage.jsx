"use client";
import toast, { Toaster } from "react-hot-toast";
import InputForm from "./InputForm";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/api";

const RergisterPage = () => {
  const { form, handleInput } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/user/getUser`, {
      method: "GET",
      credentials: "include",
    }).then(async (res) => {
      if (res.status === 200) {
        window.location.href = "/home";
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { name, email, password } = form;
    if (!name || !email || !password) {
      toast.error("Por favor llena todos los campos.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (data.status === "error") {
        toast.error("Este email esta en uso.");
        return;
      }
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-full h-full flex justify-center items-center flex-col gap-5">
      <Toaster position="bottom-center" />
      <h1 className="text-3xl font-bold"> Registrate </h1>
      <form className="flex flex-col gap-2 w-80">
        <InputForm
          label="Nombre"
          type="text"
          placeholder="Ej: Juan"
          handleInput={handleInput}
          name={"name"}
        />

        <InputForm
          label="Email"
          type="email"
          placeholder="ejemplo@email.com"
          handleInput={handleInput}
          name={"email"}
        />

        <InputForm
          label="Contraseña"
          type="password"
          placeholder="******"
          handleInput={handleInput}
          name={"password"}
        />

        <button
          className={` ${
            isLoading && "opacity-40"
          } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Cargando..." : "Registrarse"}
        </button>
      </form>
      <Link href="/login" className="text-blue-400 hover:text-blue-600">
        Ya tienes una cuenta? Inicia aqui
      </Link>
    </main>
  );
};
export default RergisterPage;
