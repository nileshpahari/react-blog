import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage.service";

function PostCard({ $id, featuredImage, title, classname }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div
        className={`bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:scale-105 ${classname}`}
      >
        <div className="h-52 w-full overflow-hidden">
          <img
            src={storageService.previewFile(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 text-white text-center">
          <h2 className="text-lg font-semibold truncate">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
