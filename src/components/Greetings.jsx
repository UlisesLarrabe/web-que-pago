const Greetings = ({ user }) => {
  return (
    <section className="pt-14">
      <h1 className="text-4xl font-bold text-center text-white">
        Bienvenido/a {user?.name}
      </h1>
      <p className="text-center text-white">
        Administra tus suscripciones de una manera sencilla
      </p>
    </section>
  );
};
export default Greetings;
