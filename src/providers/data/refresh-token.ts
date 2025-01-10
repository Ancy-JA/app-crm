import { request } from "@refinedev/nestjs-query";
import { AxiosResponse } from "axios";
import { REFRESH_TOKEN_QUERY } from "./queries"; // Ensure the query is correctly imported
import { AxiosError } from "axios";

// Function to determine if the token should be refreshed based on the error response
export const shouldRefreshToken = (response: AxiosResponse): boolean => {
  console.log("shouldRefreshToken called with response:", response);

  const errors = response?.data?.errors;
  if (!errors) {
    console.log("No errors in the response.");
    return false;
  }

  const currentRefreshToken = localStorage.getItem("refresh_token");
  if (!currentRefreshToken) {
    console.log("No refresh token found in localStorage.");
    return false;
  }

  const hasAuthenticationError = errors.some((error: any) => {
    console.log("Inspecting error:", error.extensions?.response?.statusCode);
    const statusCode = error.extensions?.response?.statusCode;
    const isUnauthorized = statusCode === 401;
    console.log("Is Unauthorized Error:", isUnauthorized, "Status Code:", statusCode);
    return isUnauthorized;
  });

  if (!hasAuthenticationError) {
    console.log("No authentication error found in errors array.");
    return false;
  }

  console.log("401 Unauthorized error detected. Should refresh token.");
  return true;
};

// Function to refresh tokens using the REFRESH_TOKEN_QUERY
export const refreshTokens = async (): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const currentAccessToken = localStorage.getItem("access_token");
  const currentRefreshToken = localStorage.getItem("refresh_token");

  if (!currentRefreshToken) {
    console.error("No refresh token found in localStorage.");
    return null;
  }

  try {
    console.log("Attempting to refresh tokens...");

    const response = await request<{
      getAccessToken: { accessToken: string; refreshToken: string };
    }>(
      "https://vineoback-gh-qa.caprover2.innogenio.com/graphql",
      REFRESH_TOKEN_QUERY,
      {
        access: currentAccessToken,
        refresh: currentRefreshToken,
      }
    );

    const { accessToken, refreshToken } = response.getAccessToken;

    // Persist the new tokens
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    console.log("Tokens refreshed successfully:", { accessToken, refreshToken });
    return { accessToken, refreshToken };
  } catch (error: any) {
    console.error("Failed to refresh tokens:", error);

    // Optionally handle errors like logging out the user
    return null;
  }

};
