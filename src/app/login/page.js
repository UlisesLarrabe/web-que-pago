import LoginPage from "@components/LoginPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Login = async () => {
  const cookie = await cookies();
  const hasCookie = cookie.has("access_token");

  if (hasCookie) {
    redirect("/home");
  }

  return <LoginPage />;
};
export default Login;
