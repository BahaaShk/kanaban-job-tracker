"use client";

import { useState, useTransition } from "react";
import { signIn } from "@/actions/auth";
import Link from "next/link";

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
          <label htmlFor="email" className="text-sm font-medium text-text-secondary mb-2">E-mail</label>
          <input
            type="email"
            className="border px-3 w-full border-border bg-surface py-1 rounded-md focus:outline-none focus:ring-2 text-text-primary"
            name="email"
            required
            placeholder="Enter your email ..."
            />
            </div>
            {/* Password */}
            <div className=" mb-2">

          <label htmlFor="password" className="text-sm font-medium text-text-secondary mb-1">Password</label>
          <input type="password" className="border px-3 w-full border-border bg-surface py-1 rounded-md focus:outline-none focus:ring-2 text-text-primary" name="password" />
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
