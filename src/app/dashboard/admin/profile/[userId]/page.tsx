import { Container } from "@/components/atoms";
import { UserProfile } from "@/components/molecules";

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  return (
    <Container>
      <UserProfile userId={params.userId} />
    </Container>
  );
};

export default ProfilePage;
