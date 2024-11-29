import LoginPage from "@components/LoginPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Login = async () => {
  const allCookies = await cookies();
  const hasCookies = allCookies.has("access_token");
  if (hasCookies) {
    redirect("/home");
  }
  return <LoginPage />;
};
export default Login;
