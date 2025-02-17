import React, { useEffect, useState } from "react";
import { Loader, PostCard } from "../components/index.js";
import dbService from "../appwrite/db.service.js";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.status);

  useEffect(() => {
    dbService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
    <Loader/> 
    );
  }
  if (posts.length === 0) {
    if (userId) {
      return (
        <div className="h-screen flex flex-col justify-center items-center text-center bg-gray-900 text-white">
          <h1 className="text-3xl font-semibold mb-4 animate-pulse text-red-500">
            No Posts Found
          </h1>
          <p className="text-gray-400">Check back later for new content.</p>
        </div>
      );
    } else {
      return (

         <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900  to-blue-700 opacity-30 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl max-w-3xl"
        >
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-white">
            Discover & Share Amazing Stories
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join our blogging community and explore a world of content written
            by passionate creators. Sign up and start your journey today!
          </p>

          <div className="flex justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-lg"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="border border-white text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all hover:bg-white hover:text-gray-900 shadow-lg"
              >
                Sign In
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-white mb-8 text-center border-b-2 border-gray-700 pb-4">
        Posts
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
export default Home;

// import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/db.service";
// import { PostCard} from '../components/index'

// export default function Home() {
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         appwriteService.getPosts().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])

//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//         </div>
//     )
// }
