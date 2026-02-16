import { useState } from "react";
import axios from "axios";

type LoginProps = {
  onLogin: (token: string) => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post<{ token: string }>(
        "http://localhost:3001/api/login",
        { username, password },
      );

      if (!response.data.token) {
        setError("Login failed: missing token");
        return;
      }

      onLogin(response.data.token);
    } catch (error) {
      setError((error as Error).message + " Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <h2>Admin login</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="login-username">
          Username
        </label>
        <input
          id="login-username"
          className="login__input"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label className="login__label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          className="login__input"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="login__error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </section>
  );
};

export default Login;
