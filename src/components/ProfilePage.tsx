import React, { useContext, FormEvent, useState, useEffect } from 'react'
import AuthContext from '../AuthContext'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import ProfileCard from './ProfileCard';

// using react-hook-form + zod is so much better than using useRef()
// because we make sure that all the inputs are controleld and their values are stored in react state vars
// behind the scenes and also zod provides validation
import { profileFormSchema } from '@/constants';

// its good practice to define interface in types.ts for objects that we pass to functions
import { Profile } from '@/types';

// this is the create profile page
const ProfilePage = () => {
  // authcontext is sure to be undefined since we provide it using the provider in app.tsx
  // that is why we use non-null assertion
  const {jwt, setJwt} = useContext(AuthContext)!;
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (jwt) {
      getProfile();
    }
  }, [jwt]);
  

  const getProfile = async () => {
    const headers = { "Authorization": `Bearer ${jwt}` };
    try {
      const response = await fetch("http://localhost:8085/users/profile", { 
        method: "GET", 
        headers 
      });
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // initialize react-hook-form with our form schema that we created using zod
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues:{
      fullname: "",
      email: "",
      phone: "",
      age:0,
      sex:"",
    }
  })

  const createProfileAction = async (data: z.infer<typeof profileFormSchema>) => {
      // await the jwt to be returned from backend and update jwt state variable
      await handlePostProfile(data);
  };

  const handlePostProfile = async (profile: Profile) => {
    const headers = {
        "Authorization": `Bearer ${jwt}`,
        "Content-type": "application/json; charset=UTF-8"
    };

    fetch("http://localhost:8085/users/profile", {
        method: "POST",
        body: JSON.stringify(profile),
        headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Profile creation failed");
        }
    })
    .then(() => {
        getProfile(); // Fetch updated profile
        console.log(profile);
    })
    .catch(error => {
        console.error('Error creating profile:', error);
    });
  };

  // if the use effect finds the current user's profile, then we return his profile card
  if (profile){
    return(
      <ProfileCard profile={profile}>
      </ProfileCard>
    )
  }

  // if the user didnt make a profile yet, we render a form to create a profile
  return (
    <main className="flex flex-row min-h-screen w-full font-inter">
      <div className="flex flex-col justify-center items-center bg-white p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createProfileAction)}  className="w-full max-w-md space-y-4 bg-white p-8 rounded shadow">
            <h2 className="text-3xl font-bold mb-6 text-center">Create Profile</h2>
            <FormField
              control={form.control}
              // the name prop connects this form field to the username key in my form 
              name="fullname"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel className="font-medium text-gray-700">Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your fullname" {...field} />
                  </FormControl>
                  <FormMessage  className="text-sm text-red-500"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel className="font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage  className="text-sm text-red-500"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel className="font-medium text-gray-700">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage  className="text-sm text-red-500"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel className="font-medium text-gray-700">Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your age" {...field} />
                  </FormControl>
                  <FormMessage  className="text-sm text-red-500"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel className="font-medium text-gray-700">Sex</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your sex" {...field} />
                  </FormControl>
                  <FormMessage  className="text-sm text-red-500"/>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-lg border border-transparent bg-blue-500 font-semibold text-white shadow">Create Profile</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}

export default ProfilePage