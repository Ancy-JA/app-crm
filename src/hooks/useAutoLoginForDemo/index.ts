import { useCallback, useEffect, useState } from "react";
import { authProvider, emails } from "@/providers";

export const useAutoLoginForDemo = () => {
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async () => {
    const email = localStorage.getItem("auto_login") || emails[0];
    const password = localStorage.getItem("password");

    // Ensure both email and password are present
    if (!email || !password) {
      setIsLoading(false);
      return;
    }

    try {
      await authProvider.login({ email, password });
    } catch (_error) {
      console.error("Auto-login failed.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const shouldLogin = localStorage.getItem("auto_login") === "true";

    if (!shouldLogin) {
      setIsLoading(false);
      return;
    }

    login();
  }, [login]);

  return { loading: isLoading };
};
