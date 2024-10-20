import { Text } from "@/components/atoms";
import { TPost } from "@/redux/features/post/post.type";
import { formatRelativeTime } from "@/utils";

type FeedAuthorInfoProps = {
  post: TPost;
};

export const FeedAuthorInfo: React.FC<FeedAuthorInfoProps> = ({ post }) => (
  <div className="flex">
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
);
