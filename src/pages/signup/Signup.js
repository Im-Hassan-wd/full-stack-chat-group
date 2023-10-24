import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isPending } = useSignup();
  let online = true;
  let photoURL = "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(displayName, email, password, photoURL, online);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Signup</h3>
      <h4>Join thousands of learners from around the world</h4>
      <div className="input-div">
        <label htmlFor="displayName">
          <span className="material-symbols-outlined">person</span>
        </label>
        <input
          type="text"
          id="displayName"
          placeholder="Display name"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </div>
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
      <button disabled={isPending}>Signup</button>
      {error && <div className="error">{error}</div>}
      <div className="action">
        Already have an account? <Link to="/login">Login</Link>{" "}
      </div>
    </form>
  );
}
