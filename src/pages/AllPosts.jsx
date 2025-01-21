import React, { useEffect, useState } from "react";
import { PostCard } from "../components/index.js";
import dbService from "../appwrite/db.service.js";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService.getPosts([]).then(()=>{
        if (posts) setPosts(posts.documents)
    })
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => {
        return (
          <div key={post.$id} className="">
            <PostCard {...post} />
          </div>
        );
      })}
    </div>
  );
}

export default AllPosts;
