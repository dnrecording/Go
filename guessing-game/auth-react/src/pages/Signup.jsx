import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      try {
        const response = await fetch("http://localhost:8000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
          navigate("/");
        }
        else{
          alert("Username have already used.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h1 class="h3 mb-3 fw-normal">Please Sign up</h1>

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
            id="floatingPassword1"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword2"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label for="floatingPassword">Confirm Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
        <button
          class="w-100 btn btn-lg btn-primary"
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
        <p class="mt-5 mb-3 text-muted">
          &copy; Internship Home Assignment @Agoda
        </p>
      </form>
    </div>
  );
};

export default Signup;
