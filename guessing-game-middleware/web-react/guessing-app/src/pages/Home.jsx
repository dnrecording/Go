import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const [guessnum, setGuessnum] = useState("");
  const [guessStatus, setGuessStatus] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setUsername(content.username);

      if (response.status === 401){
        navigate("/")
      }
    })();
  });

  const logout = async () => {
    const response = await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const content = await response.json();
    console.log(content);
    if (response.status === 200) {
      navigate("/");
    }
  };

  const guess = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/guess", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          guessnum,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 201) {
        setGuessStatus("201");
      } else if (response.status === 202) {
        setGuessStatus("202");
      } else if (response.status === 200) {
        setGuessStatus("200");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function renderSwitch(statusParam) {
    switch (statusParam) {
      case "200":
        return "That's Too High!";
      case "201":
        return "That is Correct! Regenerated!";
      case "202":
        return "That's Too Low!";
      default:
        return "Guess Your Secret!";
    }
  }


  return (
    <div>
      <form onSubmit={guess}>
        <h1 class="h3 mb-3 fw-normal">Full Stack Guessing Game</h1>
        <h1 class="h4 mb-3 fw-normal">
          {username ? "Welcome " + username : "You are not logged in."}
        </h1>
        <h1 class="h1 mb-3 fw-normal">{renderSwitch(guessStatus)}</h1>

        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="floatingInput"
            required
            onChange={(e) => setGuessnum(e.target.value)}
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)
          }}
          />
          <label for="floatingInput">Enter your number</label>
        </div>

        <h1 class="h6 mb-3 fw-normal">Please guess number between 0 to 99</h1>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Guess!
        </button>

        <p class="mt-5 mb-3 text-muted">
          &copy; Internship Home Assignment @Agoda
        </p>
      </form>
      <button class="btn btn-outline-danger" type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Home;