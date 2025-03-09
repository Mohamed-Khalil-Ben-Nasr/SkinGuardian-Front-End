
import {ProfileCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const ProfileCard: React.FC<ProfileCardProps>= ({ profile}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            {profile.fullname}
          </CardTitle>
          <CardDescription className="text-xl text-gray-600">
            My Profile
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="flex flex-col items-center gap-4 text-lg">
            <p className="font-medium text-gray-700">
              Email: {profile.email}
            </p>
            <p className="font-medium text-gray-700">
              Phone: {profile.phone}
            </p>
            <p className="font-medium text-gray-700">
              Sex: {profile.sex}
            </p>
            <p className="font-medium text-gray-700">
              Age: {profile.age}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  };
  
export default ProfileCard;
  