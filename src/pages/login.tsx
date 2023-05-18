import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import Router from "next/router";
import { authFetch } from "utils/authFetch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!authContext) {
      setError("An error occurred. Please try again.");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/ProjetAppliWeb/rest/users/login",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const { token, user } = await res.json();
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        authContext.setUser(user);
        console.log("user", user);
        // Redirect to home page
        Router.push("/");
      } else {
        // Handle error
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-gray-200 w-1/2 mx-auto rounded">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          className="bg-white"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          className="bg-white"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} variant={"destructive"}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
