export interface User  {
    username :string, 
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
  