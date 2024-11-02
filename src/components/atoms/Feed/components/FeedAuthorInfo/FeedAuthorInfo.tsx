import { Text } from "@/components/atoms";
import { TPost } from "@/redux/features/post/post.type";
import { formatRelativeTime } from "@/utils";
import { useRouter } from "next/navigation";

type FeedAuthorInfoProps = {
  post: TPost;
};

export const FeedAuthorInfo: React.FC<FeedAuthorInfoProps> = ({ post }) => {
  const router = useRouter();

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profile/${post.author._id}`);
  };

  return (
    <div className="flex items-center">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleAuthorClick}
      >
        <img
          src={post.author.profilePicture}
          alt="post_author"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="ml-3">
          <Text variant="h5" className="!font-bold text-black">
            {post.author.name}
          </Text>
          <Text variant="p5" className="text-gray-400">
            {formatRelativeTime(post.createdAt)}
          </Text>
        </div>
      </div>
    </div>
  );
};
