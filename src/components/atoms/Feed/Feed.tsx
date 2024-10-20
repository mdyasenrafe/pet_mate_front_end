import { Card, Dropdown, Menu, Button } from "antd";
import { Text } from "@/components/atoms";
import {
  FaEllipsisV,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
} from "react-icons/fa";
import Image from "next/image";
import { TPost } from "@/redux/features/post/post.type";

export const Feed: React.FC<{ post: TPost }> = ({ post }) => {
  // Dropdown menu for the three dots
  const menu = (
    <Menu>
      <Menu.Item key="1">Edit Post</Menu.Item>
      <Menu.Item key="2">Delete Post</Menu.Item>
      <Menu.Item key="3">Share</Menu.Item>
    </Menu>
  );

  return (
    <Card className="mb-6 rounded-md shadow-lg p-6">
      <div className="flex justify-between items-start">
        {/* Post title and category */}
        <div>
          <Text variant="h4" className="font-bold mb-1">
            {post.title}
          </Text>
          <Text variant="p4" className="text-gray-500">
            {post.category.toUpperCase()}
          </Text>
        </div>

        {/* Three dots menu */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button shape="circle" icon={<FaEllipsisV />} />
        </Dropdown>
      </div>

      {/* Author Info */}
      <div className="mt-2 text-sm text-gray-600">
        <Text variant="p4">
          Posted by <span className="font-semibold">{post.author?.name}</span>
        </Text>
      </div>

      {/* Post content */}
      <div className="mt-4">
        <Text variant="p4">{post.content.substring(0, 150)}...</Text>
      </div>

      {/* Images or Files */}
      {post.files && post.files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {post.files.map((file, index) => (
            <Image
              key={index}
              src={file.url}
              alt={`File-${index}`}
              width={200}
              height={200}
              className="object-cover rounded-md"
            />
          ))}
        </div>
      )}

      {/* Post Stats: Upvotes, Downvotes, Comments */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <FaThumbsUp className="text-gray-500" />
            <Text variant="p5">{post.upvoteCount}</Text>
          </div>

          <div className="flex items-center space-x-1">
            <FaThumbsDown className="text-gray-500" />
            <Text variant="p5">{post.downvoteCount}</Text>
          </div>

          <div className="flex items-center space-x-1">
            <FaComment className="text-gray-500" />
            <Text variant="p5">{post.commentCount}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
