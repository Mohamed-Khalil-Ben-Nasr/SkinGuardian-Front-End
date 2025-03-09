import React, { useContext, FormEvent } from 'react'
import AuthContext from '../AuthContext'
import NewDiagnosisPage from './NewDiagnosisPage';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from 'react-router-dom';
import logo from "../assets/skinguardian.png";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const SignUpPage = () => {
  // authcontext is sure to be undefined since we provide it using the provider in app.tsx
  // that is why we use non-null assertion
  const {jwt, setJwt} = useContext(AuthContext)!;

  // initialize react-hook-form with our form schema that we created using zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      username: "",
      password: "",
    }
  })

  const signUpAction = async (data: z.infer<typeof formSchema>) => {
    // await the jwt to be returned from backend and update jwt state variable
    await handleSignUp(data);
  };

  const handleSignUp = async (user: {username :string, password: string}) => {
    try {
      const response = await fetch("http://localhost:8085/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.status === 200) {
        const data = await response.text();
        console.log(data);
        confirmLogin(data);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  function confirmLogin(jwt: string) {
    alert("You are logged in to your account.");
    setJwt(jwt);
  }

  // if the user is logged in, we show the NewDiagnosisPage
  if (jwt){
    return (<NewDiagnosisPage></NewDiagnosisPage>);
  }


  return (
    <main className="flex flex-row min-h-screen w-full font-inter">
      {/* Left half: Sign Up Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signUpAction)} className="w-full max-w-md space-y-4 bg-white p-8 rounded shadow">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel className="font-medium text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel className="font-medium text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormDescription>Your account password.</FormDescription>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-lg border border-transparent bg-blue-500 font-semibold text-white shadow">
              Sign Up
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="cursor-pointer font-medium text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>

      {/* Right half: Logo */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={logo}
          alt="SkinGuardian"
          className="w-250 h-250"
        />
      </div>
    </main>
  );







  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage