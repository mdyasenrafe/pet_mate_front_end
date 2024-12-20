import { UserProfile } from "@/components/molecules";

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  return <UserProfile userId={params.userId} />;
};

export default ProfilePage;
