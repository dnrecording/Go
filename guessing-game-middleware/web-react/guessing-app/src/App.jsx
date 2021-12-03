import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import Signup from "./pages/Signup";
import { useAuth0 } from "./react-auth0-spa";

function App() {

  const { isAuthenticated } = useAuth0();

  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {!isAuthenticated && (
        <Login />
      )}

      {isAuthenticated && <Home />}
    </div>
  );
}

export default App;