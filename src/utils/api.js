import {
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ENV,
  NEXT_PUBLIC_ENVIRONMENT,
} from "@/loadEnv";

export const API_URL =
  NEXT_PUBLIC_ENV === "development"
    ? NEXT_PUBLIC_ENVIRONMENT
    : NEXT_PUBLIC_API_URL;
