import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/db.service.js";
import storageService from "../appwrite/storage.service.js";
import { Button } from "../components/index.js";
function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.userData);
  const isAuthor = post && authStatus ? post.userId === userData.$id : false;

  useEffect(() => {
    dbService
      .getPost(slug)
      .then((post) => {
        if (post) {
          setPost(post);
        } else {
          return <h1>Failed to find the post with slug: {slug}</h1>;
        }
      })
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  }, [slug, navigate]);

  const deletePost = () => {
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return loading ? (
    <h1>Loading, please wait...</h1>
  ) : (
    <div>
      <div>
        <img
          src={storageService.previewFile(post.featuredImage)}
          alt="Post featured image"
        />
      </div>
      {isAuthor && (
        <div>
          <div>
            <Button
              onClick={() => {
                navigate(`/edit-post/${post.$id}`);
              }}
            >
              Edit
            </Button>
            <Button onClick={deletePost}>Delete</Button>
          </div>
        </div>
      )}
      <div>
        <h1>{post.title}</h1>
      </div>
      <div>{pasrse(post.content)}</div>
    </div>
  );
}

export default Post;
