import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo, LogoutBtn } from "../index.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    { name: "Home", slug: "/", isActive: true },
    { name: "All Posts", slug: "/all-posts", isActive: authStatus },
    { name: "Add Post", slug: "/add-post", isActive: authStatus },
    { name: "Login", slug: "/login", isActive: !authStatus },
    { name: "Signup", slug: "/signup", isActive: !authStatus },
  ];

  return (
    <header className="shadow-md">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 py-3 px-4 md:px-8">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <Link to="/">
            <Logo className="text-white text-2xl font-bold" width="120px" height="auto" />
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="flex space-x-6">
              {navItems.map(
                (item) =>
                  item.isActive && (
                    <li key={item.name}>
                      <button
                        className="py-2 px-4 text-gray-800 dark:text-gray-200 font-medium hover:text-blue-700 dark:hover:text-blue-400 transition duration-300"
                        onClick={() => navigate(item.slug)}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn classname="py-2 px-4 text-gray-800 dark:text-gray-200 font-medium hover:text-blue-700 dark:hover:text-blue-400 transition duration-300"/>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Logo, LogoutBtn } from "../index.js";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// function Header() {
//   const navigate = useNavigate();
//   const authStatus = useSelector((state) => state.auth.status);
//   const navItems = [
//     {
//       name: "Home",
//       slug: "/",
//       isActive: true,
//     },
//     {
//       name: "All Posts",
//       slug: "/all-posts",
//       isActive: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       isActive: authStatus,
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       isActive: !authStatus,
//     },
//     {
//       name: "Signup",
//       slug: "/signup",
//       isActive: !authStatus,
//     },
//   ];

//   return (
//     <header>
//       <nav className="bg-white border-gray-200 dark:bg-gray-900">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <div>
//             <Link to="/">
//               <Logo className="text-blue-900 text-xl" />
//             </Link>
//           </div>
//           <div className="hidden w-full md:block md:w-auto">
//             <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//               {navItems.map((item) =>
//                 item.isActive ? (
//                   <li key={item.name}>
//                     <button
//                       className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
//                       onClick={() => navigate(item.slug)}
//                     >
//                       {item.name}
//                     </button>
//                   </li>
//                 ) : null
//               )}
//               {authStatus && (
//                 <li>
//                   <LogoutBtn />
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;
