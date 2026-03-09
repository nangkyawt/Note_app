import { LockClosedIcon, MailIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  onLogin: () => void;
}
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate("/notes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 relative overflow-hidden">
      {/* Floating hearts */}
      <div className="absolute top-10 left-10 w-12 h-12 bg-pink-400 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-16 h-16 bg-pink-500 rounded-full opacity-30 animate-pulse"></div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 relative z-10 overflow-hidden">
        <h1 className="text-4xl font-extrabold text-pink-600 text-center mb-6 animate-pulse">
          💖 MyNotes
        </h1>
        <p className="text-center text-pink-400 mb-8">Your magical note world ✨</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="relative">
            <MailIcon className="w-5 h-5 text-pink-400 absolute left-3 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full pl-10 p-4 border border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-pink-300"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-pink-400 absolute left-3 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-10 p-4 border border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition placeholder-pink-300"
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full py-3 font-bold rounded-2xl bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg hover:scale-105 transform transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-pink-400 mt-6 text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-pink-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>

        {/* Decorative hearts */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoginPage;

