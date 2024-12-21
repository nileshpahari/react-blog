import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage.service";
function PostCard({ $id, featuredImage, title, classname }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className={`${classname}`}>
        <div>
          <img src={storageService.previewFile(featuredImage)} alt={title} />
        </div>
        <div>
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
