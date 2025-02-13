import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/db.service";
import { PostForm } from "../components/index.js";
function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    dbService.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);
  return !post? null :(
    <div>
      <PostForm {...post} />
    </div>
  );
}

export default EditPost;
