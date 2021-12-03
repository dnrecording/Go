import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <main class="form-signin">
        <BrowserRouter>
          <Routes>
            <Route path="guessgame" element={<Home/> }/>
            <Route path="/" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;