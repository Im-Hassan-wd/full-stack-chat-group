import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <h4>Welcome back</h4>
      <div className="input-div">
        <label htmlFor="email">
          <span className="material-symbols-outlined">mail</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="input-div">
        <label htmlFor="password">
          <span className="material-symbols-outlined">lock</span>
        </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button disabled={isPending}>Login</button>
      {error && <div className="error">{error} </div>}
      <div className="action">
        Don't have an account yet? <Link to="/signup">Signup</Link>{" "}
      </div>
    </form>
  );
}
