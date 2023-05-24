import Router from "next/router";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

enum FormType {
  LOGIN,
  REGISTER,
}

const LoginCard: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [formType, setFormType] = useState(FormType.LOGIN);
  const [error, setError] = useState("");

  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
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

  const handleRegister = async () => {
    // Add your register logic here
    try {
      // Perform registration API call
    } catch (error) {
      setError("An error occurred. Please try again.");
      return;
    }
  };

  const toggleFormType = () => {
    setFormType((prevFormType) =>
      prevFormType === FormType.LOGIN ? FormType.REGISTER : FormType.LOGIN
    );
  };

  return (
    <div className="bg-black h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-1/2 mx-auto mt-10">
        {formType === FormType.LOGIN ? (
          <h2 className="text-2xl font-bold mb-4">Login</h2>
        ) : (
          <h2 className="text-2xl font-bold mb-4">Register</h2>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-400 p-2 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-400 p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {formType === FormType.REGISTER && (
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="border border-gray-400 p-2 w-full rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}
        {formType === FormType.REGISTER && (
          <div className="mb-4">
            <label
              htmlFor="githubLink"
              className="block text-gray-700 font-bold mb-2"
            >
              GitHub Link
            </label>
            <input
              type="text"
              id="githubLink"
              className="border border-gray-400 p-2 w-full rounded"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-between items-center">
          <div
            className="hover:underline cursor-pointer"
            onClick={toggleFormType}
          >
            {formType === FormType.LOGIN
              ? "No account yet? Register"
              : "Already have an account? Login"}
          </div>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={formType === FormType.LOGIN ? handleLogin : handleRegister}
          >
            {formType === FormType.LOGIN ? "Login" : "Register"}
          </button>
        </div>
      </div>
      </div>
  );
};

export default LoginCard;
