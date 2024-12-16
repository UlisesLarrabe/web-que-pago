export const API_URL =
  process.env.NEXT_PUBLIC_ENV === "development"
    ? process.env.NEXT_PUBLIC_ENVIRONMENT
    : process.env.NEXT_PUBLIC_API_URL;
