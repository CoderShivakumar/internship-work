"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setMessage("");
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const endpoint = isSignUp ? "signup" : "login";

    try {
      const res = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${isSignUp ? "Sign up successful!" : "Login successful!"}`);

        // Redirect to dashboard after 1.5s
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Try again.");
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            {isSignUp ? "Register" : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-center text-red-600">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        {/* Back to Dashboard Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded hover:bg-gray-800"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
