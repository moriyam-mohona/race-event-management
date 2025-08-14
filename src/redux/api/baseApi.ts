import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
// import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.access_token;
    headers.set("accept", "application/json");
    if (access_token) {
      headers.set("authorization", `${access_token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refresh_token;
    const accessToken = state.auth.access_token;

    // ✅ Don't try to refresh if user is already logged out
    if (!refreshToken || !accessToken) {
      api.dispatch(logout());
      return result;
    }

    try {
      // Try refreshing token
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `${refreshToken}`,
          },
        }
      );

      const data = await res.json();
      if (data?.success) {
        const user = state.auth.user;
        api.dispatch(
          setUser({ user, token: data.data.token, refresh_token: refreshToken })
        );

        // Retry original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh failed and user is still "logged in"
        api.dispatch(logout());
        signOut();
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "example", "event"],
  endpoints: () => ({}),
});
