import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //check to see if the fields are not empty
  const login = () => {
    if ((username === "") & (password === "")) {
      return;
    } else {
      // make api call to our backend. we'll leave this for later
      axios
        .post(
          "http://localhost:8000/login",
          {
            username: username,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // Navigate to the home page after successful login
          navigate("/cookie");
        })
        .catch((error) => {
          console.error(error);
          setError(
            "An error occurred while logging in. Please try again." + error
          );
        });
    }
  };

  return (
    <>
      <div style={{ minHeight: 800, marginTop: 30 }}>
        <h1>login page</h1>
        <div style={{ marginTop: 30 }}>
          {
            <div>
              <form>
                <p>
                  <label style={{ marginRight: 10 }}>Input Username</label>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </p>
                <p>
                  <label style={{ marginRight: 10 }}>Input Password</label>
                  <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </p>
                <button onClick={login}>Login</button>
              </form>
              <b color="red">{error}</b>
            </div>
          }
        </div>
      </div>
    </>
  );
}
