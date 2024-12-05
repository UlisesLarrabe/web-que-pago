"use client";
import InputForm from "@/components/InputForm";
import { useForm } from "@/hooks/useForm";
import { API_URL } from "@/utils/api";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const { form, handleInput } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { email, password } = form;

    try {
      const res = await fetch(`${API_URL}/api/user/loginUser`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (data.status === "error") {
        toast.error("Email o contraseña incorrectos");
        return;
      }
      // await fetch("api/cookies", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ token: data.token }),
      // });
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-full h-full flex justify-center items-center flex-col gap-5">
      <Toaster position="bottom-center" />
      <h1 className="text-3xl font-bold"> Inicia sesión </h1>
      <form className="flex flex-col gap-2 w-80" action={handleSubmit}>
        <InputForm
          label="Email"
          type="text"
          placeholder="Correo"
          handleInput={handleInput}
          name={"email"}
        />

        <InputForm
          label="Contraseña"
          type="password"
          placeholder="Contraseña"
          handleInput={handleInput}
          name={"password"}
        />

        <button
          onClick={handleSubmit}
          className={` ${
            isLoading && "opacity-40"
          } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
      <Link href="/register" className="text-blue-400 hover:text-blue-600">
        No tienes una cuenta? Registrate aqui
      </Link>
    </main>
  );
};
export default LoginPage;
