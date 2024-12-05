"use client";
import toast, { Toaster } from "react-hot-toast";
import InputForm from "./InputForm";
import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useUserContext } from "@/context/userContext";
import CloseIcon from "@/icons/CloseIcon";
import ImagesMap from "./ImagesMap";

const AddSub = ({ isVisible, setIsVisible, isEditable, sub }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addSub, user, editSub, deleteSub } = useUserContext();

  const newForm = {
    title: sub?.title || "",
    company: sub?.company || "",
    value: sub?.price?.value || "",
    currency: sub?.price?.currency || "ARS",
    expiresOn: sub?.expiresOn || "",
    isPaid: sub?.isPaid || "false",
  };

  const { form, handleInput, setForm } = useForm(newForm);

  const { title, company, value, currency, expiresOn, isPaid } = form;

  const disabled =
    isLoading || !title || !company || !value || !currency || !expiresOn;

  const handleForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!title || !company || !value || !currency || !expiresOn) {
      toast.error("Completa todos los campos");
      setIsLoading(false);
      return;
    }
    const newSub = {
      title,
      company,
      expiresOn,
      price: {
        value,
        currency,
      },
      isPaid,
    };
    return newSub;
  };

  const handleSubmit = (e) => {
    const newSub = handleForm(e);
    addSub(newSub, user.subsList._id)
      .then((res) => {
        if (res?.success) {
          toast.success("Suscripcion agregada con exito");
          setIsVisible(false);
          setForm({ currency: "ARS", isPaid: "false" });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleEditSub = (e) => {
    const newSub = handleForm(e);

    editSub(newSub, user.subsList._id, sub._id)
      .then((res) => {
        if (res?.success) {
          toast.success("Suscripcion editada con exito");
          setIsVisible(false);
          setForm({ currency: "ARS", isPaid: "false" });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <aside
      className={`  absolute border-2 border-gray-400 opacity-100  z-10 md:w-[720px] h-auto py-10 bg-[#1A1A1D] rounded-lg top-10 animate-zoom-in animate-duration-200 ${
        !isVisible ? "hidden" : "block"
      }`}
    >
      <Toaster position="bottom-center" />
      <main className="w-full flex flex-col gap-5 items-center p-2">
        <button
          className="absolute top-2 right-2 text-white p-2"
          onClick={() => setIsVisible(false)}
        >
          <CloseIcon />
        </button>
        <h2 className="text-2xl text-[#FFC470] font-bold">
          {isEditable ? "Editar suscripcion" : "Agregar suscripcion"}
        </h2>
        <form className="flex flex-col gap-2 w-4/6">
          <InputForm
            label="Nombre de la suscripcion"
            type="text"
            placeholder="Ej: Netflix Basic"
            handleInput={handleInput}
            name="title"
            hasDefaultValue={isEditable}
            defaultValue={sub?.title}
          />
          <span>Empresa</span>
          <div className="flex gap-1 flex-wrap">
            <ImagesMap handleInput={handleInput} />
          </div>

          <details className="cursor-pointer">
            <summary className="text-white text-lg">
              No encontraste el logo?
            </summary>
            <InputForm
              label="Dinos que compañia es"
              type="text"
              placeholder="Ej: Netflix"
              handleInput={handleInput}
              name="company"
              hasDefaultValue={isEditable}
              defaultValue={sub?.company}
            />
          </details>

          <InputForm
            label="Precio"
            type="number"
            placeholder="Ej: 15000"
            handleInput={handleInput}
            name="value"
            hasDefaultValue={isEditable}
            defaultValue={sub?.price?.value}
          />

          <label
            className="flex flex-col gap-1"
            onChange={handleInput}
            defaultValue={sub?.currency}
          >
            Moneda
            <select
              className="border-b-2 border-black p-2 rounded-lg border-t-0 border-x-0 text-black"
              name="currency"
            >
              <option value="ARS" className="text-black">
                ARS
              </option>
              <option value="USD" className="text-black">
                USD
              </option>
            </select>
          </label>

          <InputForm
            label="Vencimiento"
            type={"date"}
            placeholder="Ej: 2022-12-31"
            handleInput={handleInput}
            name="expiresOn"
            hasDefaultValue={isEditable}
            defaultValue={sub?.expiresOn}
          />

          <label className="flex flex-col gap-1" onChange={handleInput}>
            Esta pagado?
            <select
              className="border-b-2 border-black p-2 rounded-lg border-t-0 border-x-0 text-black"
              name="isPaid"
              defaultValue={sub?.isPaid === "true" ? "true" : "false"}
            >
              <option value="false" className="text-black">
                No
              </option>
              <option value="true" className="text-black">
                Si
              </option>
            </select>
          </label>

          <button
            className={` ${
              disabled && "opacity-40"
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2`}
            disabled={disabled}
            onClick={isEditable ? handleEditSub : handleSubmit}
          >
            {isLoading ? "Cargando..." : "Guardar"}
          </button>
          {isEditable && (
            <button
              className={` ${
                disabled && "opacity-40"
              } bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2`}
              disabled={disabled}
              onClick={() => deleteSub(user.subsList._id, sub._id)}
            >
              {isLoading ? "Cargando..." : "Eliminar"}
            </button>
          )}
        </form>
      </main>
    </aside>
  );
};
export default AddSub;
