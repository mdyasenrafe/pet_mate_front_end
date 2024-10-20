import { Text } from "@/components/atoms";
import { TPost } from "@/redux/features/post/post.type";
import {
  FaRegCommentDots,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";

type FeedBottomProps = {
  post: TPost;
};

export const FeedBottom: React.FC<FeedBottomProps> = ({ post }) => (
  <div className="mt-4 flex justify-between items-center">
    <div className="flex items-center space-x-1 cursor-pointer">
      <FaRegCommentDots className="text-xl" />
      <Text variant="p5">{post?.commentCount}</Text>
    </div>
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-1 cursor-pointer">
        <FaRegThumbsUp className="text-xl" />
        <Text variant="p5">{post?.upvoteCount}</Text>
      </div>

      <div className="flex items-center space-x-1 cursor-pointer">
        <FaRegThumbsDown className="text-xl" />
        <Text variant="p5">{post?.downvoteCount}</Text>
      </div>
    </div>
  </div>
);
