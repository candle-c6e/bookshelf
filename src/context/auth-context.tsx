import React, { useMemo, ReactNode, useCallback, useEffect } from "react";
import { useQueryClient } from "react-query";
import { getToken, removeToken, setToken } from "../auth-provider";
import { FullPageSpinner } from "../components/Lib";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hooks";

type ContextType = any;

const AuthContext = React.createContext<ContextType>(null);
AuthContext.displayName = "AuthContext";

interface Props {
  children: ReactNode;
}

async function bootstrap() {
  let user = null;

  const token = getToken();
  if (token) {
    const data = await client(`${process.env.REACT_APP_API}/me`, {
      token,
    });

    user = data.data;
  }
  return user;
}

function AuthProvider(props: Props) {
  const { data: user, isLoading, status, setData, run } = useAsync(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    run(bootstrap());
  }, [run]);

  const setDataStore = useCallback(
    (result: any) => {
      setToken(result.data.token);
      setData(result.data.user);
    },
    [setData]
  );

  const login = useCallback(
    async (username: string, password: string) => {
      const data = await client(`${process.env.REACT_APP_API}/login`, {
        data: {
          username,
          password,
        },
      });

      if (data.success) {
        setDataStore(data);
      }

      return data;
    },
    [setDataStore]
  );

  const register = useCallback(
    async (username: string, password: string, name: string) => {
      const data = await client(`${process.env.REACT_APP_API}/register`, {
        data: {
          name,
          username,
          password,
        },
      });

      if (data.success) {
        setDataStore(data);
      }

      return data;
    },
    [setDataStore]
  );

  const logout = useCallback(() => {
    queryClient.removeQueries("book");
    queryClient.removeQueries("bookSearch");
    queryClient.removeQueries("bookmark");
    removeToken();
    setData(null);
  }, [queryClient, setData]);

  const value = useMemo(() => ({ user, login, register, logout }), [
    user,
    login,
    register,
    logout,
  ]);

  if (isLoading || status === "pending") return <FullPageSpinner />;

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
