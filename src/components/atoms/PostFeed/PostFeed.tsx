import { TPost } from "@/redux/features/post/post.type";
import React from "react";
import { Feed } from "..";

type PostFeedProps = {
  posts: TPost[];
};

export const PostFeed: React.FC<PostFeedProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {posts?.map((post) => (
        <Feed key={post._id} post={post} />
      ))}
    </div>
  );
};
