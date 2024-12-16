import RergisterPage from "@/components/RergisterPage";
import { cookies } from "next/headers";

const Register = async () => {
  const cookie = await cookies();
  const hasCookie = cookie.has("access_token");

  if (hasCookie) {
    redirect("/home");
  }

  return <RergisterPage />;
};
export default Register;
