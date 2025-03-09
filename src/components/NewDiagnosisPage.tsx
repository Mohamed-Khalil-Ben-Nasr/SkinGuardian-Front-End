import React, { useState, useContext } from 'react'
import AuthContext from '../AuthContext'
import { CloudUpload } from "lucide-react";
import { diagnosisFormSchema } from '@/constants';
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
import { localizations } from '@/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { diagnosisAdviceMapping } from '@/constants';


const NewDiagnosisPage = () => {
  const {jwt, setJwt} = useContext(AuthContext)!;
  const [diagnosisResult, setDiagnosisResult] = useState<string|null>(null);
  
  // initialize react-hook-form with our form schema that we created using zod
  // form schema is defined in constants

  const diagnosisForm = useForm<z.infer<typeof diagnosisFormSchema>>({
    resolver: zodResolver(diagnosisFormSchema),
    defaultValues : {
      localization: "",
      image: undefined
    },
  })

  const submitDiagnosis = async (data: z.infer<typeof diagnosisFormSchema>) =>{
    // for making sure we are submitting the correct diagnosis
    console.log("diagnosis form data", data);

    // construct headers using jwt for authentication
    const headers = {
      "Authorization": `Bearer ${jwt}`,
    };

    // Create a new FormData object to hold our multipart request
    const formData = new FormData();
    
    // append the image file to the post diagnosis request body, which is form-data (as we tested on postman)
    // we upload the image as it is (in bytes) because the backend takes care of base64 encoding before passing to model
    if(data.image && data.image.length > 0){
      // make sure image content type is image/jpeg
      console.log("Image content type:", data.image[0].type);

      // data.image is a FileList so we take the first element since we are uploading only one file
      // key and value { "image": the actual image.jpg}
      formData.append("image",data.image[0])
    } else {
      alert("please upload an image");
      return;
    }

    // create a metadata object that my backend expects
    const metadata ={
      localization: data.localization
    }
    // append metadata to formData object as a application/json object because thats what my backend expects
    formData.append(
      "metadata",
      // a Blob is a file-like object of immutable, raw data
      // i use it so that i can explicitly asssign the  type: "application/json" 
      // if i just add JSON.stringify(metadata) to form data the backend wont know how to parse it and i will get this error
      //[org.springframework.web.HttpMediaTypeNotSupportedException: Content-Type 'application/octet-stream' is not supported]
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );

    try {
      const response = await fetch("http://localhost:8085/diagnosis", {
        method: "POST",
        // Let the browser set the Content-Type (with boundary) automatically
        body: formData,
        headers: headers
      });

      if (response.ok) {
        // the backend will return the classification result
        const resultText = await response.text();
        setDiagnosisResult(resultText);
      } else {
        alert("Diagnosis failed");
      }
    } catch (error) {
      console.error("Error during diagnosis:", error);
      alert("Diagnosis failed");
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center font-inter bg-gray-50">
      <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
        <Form {...diagnosisForm}>
          <form onSubmit={diagnosisForm.handleSubmit(submitDiagnosis)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Skin Lesion Diagnosis</h2>
            {/* Dropdown for Localization */}
            <FormField
              control={diagnosisForm.control}
              name="localization"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1.5">
                  <FormLabel className="font-medium text-gray-700">
                    Localization
                  </FormLabel>
                  <FormControl>
                    <Select  value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Skin Lesion Localization" />
                      </SelectTrigger>
                      <SelectContent>
                        {localizations.map((loc, index) => (
                          <SelectItem key={index} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            {/* File Input for Image */}
            <FormField
              control={diagnosisForm.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="border rounded p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-lg bg-blue-500 font-semibold text-white shadow">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      {
        diagnosisResult && (
          <div className="mt-6 text-center text-xl font-bold text-green-600">
            <h1>Diagnosis: {diagnosisResult}</h1>
            <p className="text-red-600">{diagnosisAdviceMapping[diagnosisResult]}</p>
          </div>
        )
      }

    </main>
  );
}

export default NewDiagnosisPage