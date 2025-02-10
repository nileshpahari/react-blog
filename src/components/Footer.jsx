// import React from "react";
// import Logo from "./Logo.jsx";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className="bg-white shadow-sm dark:bg-gray-900 w-full">
//       <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
//         <div className="sm:flex sm:items-center sm:justify-between">
//           <Link
//             to="/"
//             className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
//           >
//               <Logo className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"/> 
//           </Link>
//           <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
//             <li>
//               <Link className=" hover:underline me-4 md:me-6" to="/about">
//                 {" "}
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link className="hover:underline me-4 md:me-6" to="/">
//                 {" "}
//                 Privacy Policy
//               </Link>
//             </li>
//             <li>
//               <Link className="hover:underline me-4 md:me-6" to="/">
//                 Licensing
//               </Link>
//             </li>
//             <li>
//               <Link className="hover:underline" to="/contact">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
//         <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
//           © 2024 Blog™ . All Rights Reserved.
//         </span>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from "react";
import Logo from "./Logo.jsx";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 w-full shadow-md">
      <div className="max-w-screen-xl mx-auto p-6 md:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <Link to="/">
            <Logo className="text-2xl font-semibold dark:text-white" />
          </Link>
          <ul className="flex flex-wrap justify-center sm:justify-start mt-4 sm:mt-0 text-sm font-medium text-gray-600 dark:text-gray-400">
            <li><Link className="hover:underline mx-4" to="/about">About</Link></li>
            <li><Link className="hover:underline mx-4" to="/">Privacy Policy</Link></li>
            <li><Link className="hover:underline mx-4" to="/">Licensing</Link></li>
            <li><Link className="hover:underline mx-4" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <hr className="my-6 border-gray-300 dark:border-gray-700" />
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">© 2024 Blog™. All Rights Reserved.</p>
      </div>
    </footer>
  );
}