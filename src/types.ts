export interface User  {
    name :string, 
    password: string
  }

export interface Profile {
    fullname: string;
    email: string;
    phone: string;
    age: number;
    sex: string;
  }

export interface ProfileCardProps {
  profile: Profile;
}

export interface Diagnosis {
  diagnosisId: string;
  userId: string;
  sex: string;
  age: number;
  localization: string;
  imageUrl: string;
  diagnosisResult: string;
}

export interface DiagnosisCardProps {
  diagnosis: Diagnosis;
}