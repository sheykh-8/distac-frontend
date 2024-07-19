"use client";
import Image from "next/image";
import { useFirebase } from "@/hooks/useFirebase";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
  useSignInWithGithub,
  useSignOut
} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

type AuthForm = {
  email: string;
  password: string;
};

export default function Auth() {
  const form = useForm<AuthForm>();
  const [mode, setMode] = useState<"login" | "signup">("login");

  const router = useRouter();

  const authActionLabel = mode === "login" ? "Login" : "Signup";

  // using react hook form to check the authentication state and handling google authentication and email authentication:
  const { auth, signInWithGoogle } = useFirebase();
  const [user, loading, error] = useAuthState(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  // const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [createUserwithEmailHandler] = useCreateUserWithEmailAndPassword(auth);
  const [signOut] = useSignOut(auth);

  const handleSubmit = (data: AuthForm) => {
    if (mode === "login") {
      signInWithEmailAndPassword(data.email, data.password);
    } else {
      createUserwithEmailHandler(data.email, data.password);
    }
  };

  const handleSignInWithGoogle = () => {
    console.log("clicking");
    const res = signInWithGoogle();
    res.then(console.log)
  };

  if (loading) {
    // return a loading spinner
    return <LoadingSpinner />
  }

  if (user) { 
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome, {user.email}!</h1>
        <Button onClick={() => router.push('/dashboard')}>
          Continue to Dashboard
        </Button>
        <Button variant="outline" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">

        {/* Not Authenticated */}
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{authActionLabel}</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...form.register("email", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...form.register("password", { required: true })}
                />
              </div>
              <Button type="submit" className="w-full">
                {authActionLabel}
              </Button>
            </div>
          </form>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignInWithGoogle}
          >
            {authActionLabel} with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            {mode === "login" ? "Don't" : "Already"} have an account?{" "}
            <Link
              href="#"
              className="underline"
              onClick={() => {
                setMode((val) => {
                  if (val === "login") {
                    return "signup";
                  }
                  return "login";
                });
              }}
            >
              {mode !== "login" ? "Login" : "Sign Up"}
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/landing.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
