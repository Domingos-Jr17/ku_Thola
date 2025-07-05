import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Falha no login");

      const { token, userId } = await res.json();
      localStorage.setItem("rh_token", token);
      localStorage.setItem("userId", userId);
      navigate("/rh/dashboard");
    } catch (err) {
      throw err;
    }
  };

  return { login };
};
