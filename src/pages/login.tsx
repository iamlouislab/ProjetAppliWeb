import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import Router from "next/router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authContext) {
      setError("An error occurred. Please try again.");
      return;
    }

    const { setUser } = authContext;

    // Call your API
    const res = await fetch("http://localhost:8080//login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const { token, user } = await res.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      // Redirect to home page
      Router.push("/");
    } else {
      // Handle error
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl w-1/2">
        <h1 className="text-3xl font-bold mb-10 text-center">Login</h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <input
          type="text"
          className="block w-full p-2 mb-4 border rounded shadow-sm"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="block w-full p-2 mb-4 border rounded shadow-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="block w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
