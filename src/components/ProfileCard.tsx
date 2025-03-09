
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
      <Card>
        <CardHeader>
          <CardTitle>{profile.fullname}</CardTitle>
          <CardDescription>My Profile</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.sex}</p>
          <p>{profile.age}</p>
        </CardContent>
      </Card>
    );
  };
  
export default ProfileCard;
  