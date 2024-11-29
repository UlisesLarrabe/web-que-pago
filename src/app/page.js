import Link from "next/link";
export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-8xl text-[#FFC470] font-bold">¿Cuando pago?</h1>
      <p className="text-white font-semibold text-3xl">
        Web hecha para saber cuando pagar tus suscripciones mensuales.
      </p>

      <Link
        className=" bg-[#cb903c] hover:bg-[#644419] text-white font-bold py-2 px-4 rounded "
        href="/login"
      >
        Empieza a administrar tus suscripciones
      </Link>
    </main>
  );
}
