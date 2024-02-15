import React, { useState, useEffect } from "react";
import {
  getAllPostsService,
  likePostService,
  dislikePostService,
  deletePostService,
  addCommentService,
} from "../../utilities/post/post-service";

const PostsList = ({ authToken }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await getAllPostsService();
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await likePostService(postId, authToken);
      fetchPosts();
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await dislikePostService(postId, authToken);
      fetchPosts();
    } catch (error) {
      console.error("Failed to dislike the post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePostService(postId, authToken);
      fetchPosts();
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  const handleComment = async (postId, commentText) => {
    try {
      await addCommentService(postId, commentText, authToken);
      fetchPosts();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          className="post"
        >
          <p>{post.text}</p>
          <div className="actions">
            <button onClick={() => handleLike(post._id)}>Like</button>
            <button onClick={() => handleDislike(post._id)}>Dislike</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const commentText = e.target.elements.comment.value;
              handleComment(post._id, commentText);
              e.target.elements.comment.value = ""; // Clear input after submission
            }}
          >
            <input
              type="text"
              name="comment"
              placeholder="Write a comment..."
            />
            <button type="submit">Submit Comment</button>
          </form>
          <div className="comments">
            {post.comments?.map((comment) => (
              <div
                key={comment._id}
                className="comment"
              >
                <p>{comment.text}</p>
                {/* Add any additional comment actions here */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
