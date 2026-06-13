"use client";

import { useState, useTransition } from "react";
import { signIn } from "@/actions/auth";
import Link from "next/link";

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);

 const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      setErrorMsg(null);
      const result = await signIn(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-bg">
      <div className="max-w-md rounded-md bg-surface w-full shadow-xl p-8">
        <h1 className="text-center mb-4 text-2xl font-bold">Welcome Back</h1>
        <p className="text-text-secondary mb-6">Sign in to your account</p>
        <form action={handleSubmit} className="mt-4 flex flex-col">
          {/* Email */}
          <div className=" mb-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-secondary"
            >
              E-mail
            </label>
            <input
              type="email"
              className="border px-3 w-full border-border bg-surface py-1 rounded-md focus:outline-none focus:ring-2 text-text-primary mt-1"
              name="email"
              required
              placeholder="Enter your email ..."
            />
          </div>
          {/* Password */}
          <div className=" mb-4"
      >
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-secondary"
            >
              Password
            </label>
            <div className="relative mt-1">

            <input
              type={showPassword ? "text" : "password"}
              required
              className="border w-full pl-3 pr-14 border-border bg-surface py-1 rounded-md focus:outline-none focus:ring-2 text-text-primary"
              name="password"
              />
            <button
      type="button"
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
              </div>
          </div>
          {/* error message  */}
          {errorMsg && <p className="text-danger text-sm mt-1">{errorMsg}</p>}
          <button
            type="submit"
            disabled={isPending}
            className={`border bg-accent text-white py-2 px-4 rounded-md font-medium hover:bg-accent-hover mt-8 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-text-secondary">
          Don't have an account ?{" "}
          <Link href={"/signup"} className="text-accent">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
