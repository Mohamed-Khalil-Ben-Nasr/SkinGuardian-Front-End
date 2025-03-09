import { z } from "zod";

// using react-hook-form + zod is so much better than using useRef()
// because we make sure that all the inputs are controleld and their values are stored in react state vars
// behind the scenes and also zod provides validatio
// this is the form schema for login and sign up
export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// form schema for creating a profile
export const profileFormSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  email:z.string(),
  phone: z.string(),
  age: z.number(),
  sex: z.string()
});

// form schema for postin a new diagnosis
export const diagnosisFormSchema = z.object({
  localization: z.string().min(1, { message: "Please select a localization." }),
  image: z.any(), // We will validate later in the onSubmit function that a file is provided in the component
});

export const localizations = ['abdomen','acral','back','chest','ear','face','foot','genital',  'hand','lower extremity','neck', 'scalp', 'trunk', 'unknown', 'upper extremity']

