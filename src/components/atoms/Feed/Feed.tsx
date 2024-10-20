import { Card, Dropdown, Button } from "antd";
import { Text } from "@/components/atoms";
import {
  FaEllipsisV,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaRegCommentDots,
} from "react-icons/fa";
import Image from "next/image";
import { TPost } from "@/redux/features/post/post.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { BiDownvote, BiUpvote } from "react-icons/bi";

dayjs.extend(relativeTime);

type FeedProps = {
  post: TPost;
};

export const Feed: React.FC<FeedProps> = ({ post }) => {
  const items = [
    {
      label: "Edit Post",
      key: 1,
    },
    {
      label: "Delete Post",
      key: 2,
    },
  ];

  const relativeDate = dayjs(post.createdAt).fromNow();

  return (
    <Card className="mb-6 rounded-md shadow-lg p-6">
      <div className="flex justify-between items-start mb-3">
        <div className="flex ">
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
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button shape="circle" icon={<FaEllipsisV />} />
        </Dropdown>
      </div>

      <div>
        <Text variant="h4" className="font-bold mb-1 !text-black">
          {post.title}
        </Text>
      </div>

      <div className="mt-4">
        <Text variant="p4">{post.content.substring(0, 150)}...</Text>
      </div>

      {post.files && post.files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {post.files.map((file, index) => {
            if (file.type === "image") {
              return (
                <Image
                  key={index}
                  src={file.url}
                  alt={`File-${index}`}
                  width={200}
                  height={200}
                  className="object-cover rounded-md"
                />
              );
            }
          })}
        </div>
      )}
      {post.files && post.files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {post.files.map((file, index) => {
            if (file.type === "pdf") {
              return (
                <a
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border border-gray-300 p-4 rounded-md"
                >
                  <span className="text-gray-700">View PDF</span>
                </a>
              );
            }
          })}
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-1 cursor-pointer">
          <FaRegCommentDots className=" text-xl" />
          <Text variant="p5">{post.commentCount}</Text>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 cursor-pointer">
            <BiUpvote className="text-gray-500 text-xl" />
            <Text variant="p5">{post.upvoteCount}</Text>
          </div>

          <div className="flex items-center space-x-1 cursor-pointer">
            <BiDownvote className="text-gray-500 text-xl" />
            <Text variant="p5">{post.downvoteCount}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
