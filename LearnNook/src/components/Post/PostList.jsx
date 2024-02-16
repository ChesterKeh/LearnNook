import React, { useEffect, useState } from "react";
import {
  getAllPostsService,
  likePostService,
  dislikePostService,
} from "../../utilities/post/post-service";

import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPostsService();
        setPosts(data.tasks); // Assume tasks is your posts array
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      }
    };

    fetchPosts();
  }, []);

  const toggleLike = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await dislikePostService(postId);
      } else {
        await likePostService(postId);
      }
      const updatedPosts = posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLiked: !isLiked,
              likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Posts</h1>
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold">{post.name}</h2>
              <p className="text-gray-700 mt-2">{post.text}</p>
              <div className="mt-4 flex items-center">
                <button
                  className="text-red-500"
                  onClick={() => toggleLike(post._id, post.isLiked)}
                >
                  {post.isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found</p>
      )}
    </div>
  );
}

export default PostList;
