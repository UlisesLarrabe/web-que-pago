import { HomePage } from "@/components/HomePage";
import { UserProvider } from "@/context/userContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  // const allCookies = await cookies();
  // const hasCookies = allCookies.has("access_token");
  // if (!hasCookies) {
  //   redirect("/login");
  // }

  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  );
};
export default Home;
