import { useState } from "react";
import Link from "next/link";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      `email: ${email}, password: ${password}, isSignIn: ${isSignIn}`
    );
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          {isSignIn ? "Sign in" : "Register"}
        </h2>
        <form onSubmit={handleAuth} className="flex flex-col space-y-4">
          <label htmlFor="email" className="font-bold text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="rounded-lg border border-gray-400 px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="password" className="font-bold text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="rounded-lg border border-gray-400 px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {isSignIn ? "Sign in" : "Register"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p className="mt-4">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-1 hover:underline"
            onClick={toggleAuthMode}
          >
            {isSignIn ? "Register" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
