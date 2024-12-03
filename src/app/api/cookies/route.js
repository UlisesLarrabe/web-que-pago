import { cookies } from "next/headers";

export async function POST(req, res) {
  const { token } = await req.json();

  const allCookies = await cookies();

  allCookies.set({
    name: "access_token",
    value: token,
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return Response.json({
    status: 200,
    data,
  });
}

export async function DELETE() {
  cookies().delete("access_token");
  return Response.json({
    status: "success",
  });
}
