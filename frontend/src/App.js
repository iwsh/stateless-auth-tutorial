import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import ShowCookie from "./ShowCookie";
import { RequireToken, setToken } from "./Auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/cookie"
          element={
            <RequireToken>
              <ShowCookie />
            </RequireToken>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
