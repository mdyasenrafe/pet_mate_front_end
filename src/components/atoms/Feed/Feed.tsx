import { Card, Dropdown, Button } from "antd";
import { Text } from "@/components/atoms";
import { FaEllipsisV } from "react-icons/fa";
import { TPost } from "@/redux/features/post/post.type";
import { FeedAuthorInfo, FeedBottom, FeedFiles } from "./components";

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

  return (
    <Card className="mb-6 rounded-md shadow-lg p-6">
      <div className="flex justify-between items-start mb-3">
        <FeedAuthorInfo post={post} />
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

      <FeedFiles files={post.files} />
      <FeedBottom post={post} />
    </Card>
  );
};
