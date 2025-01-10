import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";

import { createClient } from "graphql-ws";

import { axiosInstance } from "./axios";
import { AxiosError } from "axios";
export const API_BASE_URL = "https://vineoback-gh-qa.caprover2.innogenio.com/graphql";
export const API_URL = `${API_BASE_URL}`;
export const WS_URL = "wss://vineoback-gh-qa.caprover2.innogenio.com/graphql";

export const client = new GraphQLClient(API_URL, {
  

fetch: async (url: string, options: any) => {
  try {
    const response = await axiosInstance({
      method: options.method || 'POST',
      url,
      headers: options.headers || {},
      data: options.body || {},
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("GraphQL Fetch Error:", error.response?.data || error.message);
      const errors = error.response?.data?.errors || [];
      const statusCode = error.response?.status || 500;

      return Promise.reject({
        message: errors.map((err: any) => err?.message).join(", ") || "Unknown Error",
        statusCode,
        errors,
      });
    } else {
      console.error("Unexpected Error:", error);
      throw error; // Re-throw if it's not an Axios error
    }
  }
}

  
});

export const wsClient = createClient({
  url: WS_URL,
  connectionParams: () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }),
});

export const dataProvider = graphqlDataProvider(client);

export const liveProvider = graphqlLiveProvider(wsClient);
