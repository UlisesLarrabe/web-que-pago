import { API_URL } from "@utils/api.js";
import { cookies } from "next/headers";

export async function POST(req, res) {
  const body = await req.json();
  const response = await fetch(`${API_URL}/api/user/loginUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const data = await response.json();

  const { status } = data;
  if (status === "error") {
    return Response.json({
      status: "error",
    });
  }

  cookies().set({
    name: "access_token",
    value: data.token,
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return Response.json({
    status: 200,
    data: data.token,
  });
}

export async function DELETE() {
  cookies().delete("access_token");
  return Response.json({
    status: "success",
  });
}
