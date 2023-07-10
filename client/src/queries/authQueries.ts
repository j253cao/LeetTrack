import middleware from "./middleware";

type LoginResponse = {
  token?: string;
  id?: string;
  email?: string;
  success: boolean;
};

export type SignUpResponse = {
  msg: string;
  success: boolean;
};

export const authQueries = {
  loginUser: async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ email, password });
    const response: LoginResponse = await middleware.postQuery(
      "auth/login",
      body,
      headers
    );

    return response;
  },
  createUser: async (email: string, password: string) => {
    const body = JSON.stringify({ email, password });
    const headers = {
      "Content-Type": "application/json",
    };
    const response: SignUpResponse = await middleware.postQuery(
      "auth/sign-up",
      body,
      headers
    );

    return response;
  },
  verifyUser: async (token: string) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": token,
    };
    const response = await middleware.getQuery("auth/verify", headers);

    return response;
  },
};
