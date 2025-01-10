import { AuthProvider } from "@refinedev/core";

import type { User } from "@/graphql/schema.types";
//import { disableAutoLogin, enableAutoLogin } from "@/hooks";
//import jwtDecode from "jwt-decode";
import { API_BASE_URL, API_URL, client, dataProvider } from "./data";

export const emails = [
  "testuser1@gmail.com",
  
];

const randomEmail = emails[Math.floor(Math.random() * emails.length)];

export const demoCredentials = {
  email: "",
  password: "",
};

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: {
            payload: {
              email,
              password,
            },
          },
          rawQuery: `
            query userLogin($payload: UserLoginDto!) {
              userLogin(payload: $payload) {
                accessToken
                refreshToken
              }
            }
          `,
        },
      });

      // Save tokens to localStorage
      const { accessToken, refreshToken } = data.userLogin;
      client.setHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

     // enableAutoLogin(email);

     return {
      success: true,
      redirectTo: "/",
    };
    
    } catch (error: any) {
      console.error("Login error:", error); // Debug log for troubleshooting
      return {
        success: false,
        error: {
          message: "Invalid login credentials. Please try again.",
          name: "LoginError",
        },
      };
    }
  },
  register: async ({ email, password }) => {
    try {
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: { email, password },
          rawQuery: `
                mutation register($email: String!, $password: String!) {
                    register(registerInput: {
                      email: $email
                      password: $password
                    }) {
                        id
                        email
                    }
                  }
                `,
        },
      });

     // enableAutoLogin(email);

      return {
        success: true,
        redirectTo: `/login?email=${email}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Register failed",
          name: "name" in error ? error.name : "Invalid email or password",
        },
      };
    }
  },
  logout: async () => {
    client.setHeaders({
      Authorization: "",
    });

   // disableAutoLogin();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error?.statusCode === "UNAUTHENTICATED") {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const accessToken = localStorage.getItem("access_token");
    console.log("Access Token:", accessToken);
  
    if (!accessToken) {
      return { authenticated: false };
    }
  
    return { authenticated: true };
  },
  
  forgotPassword: async () => {
    return {
      success: true,
      redirectTo: "/update-password",
    };
  },
  updatePassword: async () => {
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  getIdentity: async () => {
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          rawQuery: `
            query getBoxHistoryAdmin($searchString: String!, $page: Float!, $pageSize: Float!) {
              getBoxHistoryAdmin(searchString: $searchString, page: $page, pageSize: $pageSize) {
                total
                boxes {
                  _id
                  user {
                    _id
                    email
                    name
                    phone
                    house
                    city
                    country
                    zipcode
                  }
                  created_at
                  delivery_date
                  status
                  box_type
                  box_wines {
                    _id
                    name
                    box_count
                  }
                }
              }
            }
          `,
          variables: {
            searchString: "", // Replace with your dynamic search value
            page: 1,
            pageSize: 10,
          },
        },
      });
  
      console.log("Box History Admin Data:", data); // Debug log for fetched data
      return data.getBoxHistoryAdmin; // Return the fetched data
    } catch (error) {
      console.error("Box History Admin Error:", error); // Debug log for errors
      return undefined;
    }
  },
  
};


