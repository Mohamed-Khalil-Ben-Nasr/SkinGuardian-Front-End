import React, { useContext, FormEvent } from 'react'
import AuthContext from '../AuthContext'
import NewDiagnosisPage from './NewDiagnosisPage';
import SignUpPage from './SignUpPage';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from 'react-router-dom';

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


// using react-hook-form + zod is so much better than using useRef()
// because we make sure that all the inputs are controleld and their values are stored in react state vars
// behind the scenes and also zod provides validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LogInPage = () => {
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

  
  const loginAction = async (data: z.infer<typeof formSchema>) => {
    // await the jwt to be returned from backend and update jwt state variable
    await handleLogin(data);
  };

  const handleLogin = async (user: {username :string, password: string}) => {
    try {
      const response = await fetch("http://localhost:8085/user/login", {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold">Log In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(loginAction)} className="space-y-4">
            <FormField
              control={form.control}
              // the name prop connects this form field to the username key in my form 
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormDescription>Your account password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Log In</Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogInPage