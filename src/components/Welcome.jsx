import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Welcome() {
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
          Join our blogging community and explore a world of content written by
          passionate creators. Sign up and start your journey today!
        </p>

        <div className="flex justify-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

export default Welcome;
