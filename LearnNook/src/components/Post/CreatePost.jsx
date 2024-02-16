import React, { useState } from "react";
import axios from "axios";

const CreatePost = ({ authToken }) => {
  const [postText, setPostText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/posts",
        { text: postText },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setPostText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto my-8"
    >
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        rows="4"
      />
      <button
        type="submit"
        className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;
