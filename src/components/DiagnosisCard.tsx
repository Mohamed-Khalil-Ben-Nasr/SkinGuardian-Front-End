import React from 'react';
import { DiagnosisCardProps } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ diagnosis }) => {
    console.log("Diagnosis image URL:", diagnosis.imageUrl);

  return (
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="bg-blue-600 p-4 rounded-t-lg text-center">
          <CardTitle className="text-4xl font-bold text-white">
            {diagnosis.diagnosisResult}
          </CardTitle>
          <CardDescription className="text-xl text-blue-200">
            Your Diagnosis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="flex flex-col items-center gap-6 text-lg">
            <p className="font-medium text-gray-700">
              Localization: {diagnosis.localization}
            </p>
            <p className="font-medium text-gray-700">
              Age: {diagnosis.age} | Sex: {diagnosis.sex}
            </p>
            {/* Display the image from image in s3 bucket url 
            I had to modify the bucket policy to make all of the objects in my skinguardian-images bucket have public-read access
            and i attached s3PutBucketPolicy to the IAM user that manages the backend and who is logged in the ams cli: SageMaker User
            */}
            <div className="w-full flex justify-center">
              <img
                src={diagnosis.imageUrl}
                alt="Diagnosis"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </CardContent>
      </Card>
  );
};

export default DiagnosisCard;
