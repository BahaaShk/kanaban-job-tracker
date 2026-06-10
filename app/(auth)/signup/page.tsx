"use client";

import { useState, useTransition } from "react";
import { signIn } from "@/actions/auth";
import Link from "next/link";

const SignUpPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>("hello");
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
    <div className="min-h-screen w-full flex justify-center items-center">
  <div className="max-w-md rounded-md bg-bg w-full shadow-md p-4">
<h1 className="text-center mb-4">Welcome Back</h1>
<h3>Sign Up to you Account</h3>
<form action={handleSubmit} className="mt-4 flex flex-col gap-2">
  <label htmlFor="email">E-mail</label>
<input type="email" className="border p-1" name="email" required placeholder="Enter your email ..."  />
  <label htmlFor="password">Password</label>
<input type="password" className="border p-1" name="password"  />
{errorMsg && <p className="text-danger">{errorMsg}</p>}
<button type="submit" className="border p-1 w-30 justify-center items-center">Submit</button>
</form>
<p className="mt-1">Already have an account ? <Link href={'/login'} className="text-accent">Login</Link></p>
  </div>
    </div>
)
};

export default SignUpPage;