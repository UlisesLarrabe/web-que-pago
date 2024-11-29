import RergisterPage from "@/components/RergisterPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Register = async () => {
  const allCookies = await cookies();
  const hasCookies = allCookies.has("access_token");
  if (hasCookies) {
    redirect("/home");
  }
  return <RergisterPage />;
};
export default Register;
