import { HomePage } from "@/components/HomePage";
import { UserProvider } from "@/context/userContext";
import { API_URL } from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  const cookie = await cookies();
  const token = cookie.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await fetch(`${API_URL}/api/user/getUser`, {
    credentials: "include",
    headers: {
      Authorization: `${token}`,
    },
  });
  const user = await response.json();

  return (
    <UserProvider>
      <HomePage user={user} />
    </UserProvider>
  );
};
export default Home;
