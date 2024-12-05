import { HomePage } from "@/components/HomePage";
import { UserProvider } from "@/context/userContext";

const Home = async () => {
  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  );
};
export default Home;
