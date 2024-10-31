import { TPost } from "@/redux/features/post/post.type";
import React from "react";
import { Feed } from "..";

type PostFeedProps = {
  posts: TPost[];
  isAuthor?: boolean;
  isAdmin?: boolean;
};

export const PostFeed: React.FC<PostFeedProps> = ({
  posts,
  isAuthor,
  isAdmin,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Feed
            key={post._id}
            post={post}
            isAuthor={isAuthor || false}
            isAdmin={isAdmin}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
};
