import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        navigate("/guessgame");
      }else{
      alert("Login Fail.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h1 class="h3 mb-3 fw-normal">Full Stack Guessing Game</h1>

        <div class="form-floating">
          <input
            class="form-control"
            id="floatingInput"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label for="floatingInput">Username</label>
        </div>

        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="floatingPassword">Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <button
          class="w-100 btn btn-lg btn-primary"
          type="button"
          onClick={() => {
            navigate("signup");
          }}
        >
          Sign up
        </button>
        <p class="mt-5 mb-3 text-muted">
          &copy; Internship Home Assignment @Agoda
        </p>
      </form>
    </div>
  );
};

export default Login;
