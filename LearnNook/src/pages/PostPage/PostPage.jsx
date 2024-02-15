import React from "react";
import CreatePost from "../../components/Post/CreatePost";
import PostsList from "../../components/Post/PostList";

const PostsPage = () => {
  return (
    <div>
      <CreatePost />
      <PostsList />
    </div>
  );
};

export default PostsPage;
