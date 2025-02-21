import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/db.service.js";
import storageService from "../appwrite/storage.service.js";
import { Button, Loader } from "../components/index.js";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.userData);
  const isAuthor = post && authStatus ? post.userId === authStatus.$id : false;

  useEffect(() => {
    dbService
      .getPost(slug)
      .then((post) => {
        if (post) {
          setPost(post);
        }
      })
      .catch((error) => {
        console.log("Error while fetching the post ", error);
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const deletePost = () => {
    try {
      dbService.deletePost(post.$id).then((status) => {
        if (status) {
          storageService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    } catch (error) {
      alert("Failed to delete the post");
      console.log("Error while deleting the post: ", error);
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    if (!post) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <h1 className="text-3xl text-white">
            Failed to find the post with slug: {slug}
          </h1>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen flex justify-center items-center py-10 px-4 ">
          <div className="w-11/12  bg-gray-800 p-8 rounded-lg shadow-lg text-white ">
            {post && post.featuredImage && (
              <div className="mb-6">
                <img
                  src={storageService.previewFile(post.featuredImage)}
                  alt="Post featured image"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="prose prose-invert max-w-none mb-6">
              {parse(post.content)}
            </div>

            {isAuthor && (
              <div className="flex  space-x-4 mt-32">
                <Button
                  classname=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg "
                  onClick={() => navigate(`/edit-post/${post.$id}`)}
                >
                  Edit
                </Button>
                <Button
                  classname=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg "
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Post;
