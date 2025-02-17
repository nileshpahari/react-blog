import React, { useEffect, useState } from "react";
import { Loader, PostCard } from "../components/index.js";
import dbService from "../appwrite/db.service.js";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userData.$id);
  useEffect(() => {
    dbService
      .getPosts([Query.equal("userId", userId)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error))
      .finally(() => setLoading(false));
  }, [userId]);
  if (loading) {
    return <Loader />;
  }
  if (posts.length === 0) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-center bg-gray-900 text-white">
        <h1 className="text-3xl font-semibold mb-4 animate-pulse text-red-500">
          No Posts Found
        </h1>
        <p className="text-gray-400">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-white mb-8 text-center border-b-2 border-gray-700 pb-4">
        Your Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.$id}
            className="transition-transform transform hover:scale-105 hover:shadow-2xl bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllPosts;

// import React, { useEffect, useState } from "react";
// import { PostCard } from "../components/index.js";
// import dbService from "../appwrite/db.service.js";

// function AllPosts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     dbService
//       .getPosts([])
//       .then((posts) => {
//         if (posts) {
//           setPosts(posts.documents);
//         }
//       })
//       .catch((error) => console.error("Error fetching posts:", error));
//   }, []);

//   if (posts.length === 0) {
//     return (
//       <div className="h-screen flex flex-col justify-center items-center text-center">
//         <h1 className="text-3xl font-semibold text-white mb-4 animate-pulse">
//           No Posts Found
//         </h1>
//         <p className="text-gray-400">Check back later for new content.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-4xl font-bold text-white mb-8 text-center">
//         All Posts
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {posts.map((post) => (
//           <div
//             key={post.$id}
//             className="transition-transform transform hover:scale-105 hover:shadow-lg"
//           >
//             <PostCard {...post} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AllPosts;
