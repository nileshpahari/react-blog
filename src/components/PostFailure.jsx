import React from "react";

function PostFailure({ slug }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl text-white">
        Failed to find the post with slug: {slug}
      </h1>
    </div>
  );
}

export default PostFailure;
