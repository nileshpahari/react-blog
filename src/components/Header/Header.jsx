import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo, LogoutBtn } from "../index.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      isActive: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      isActive: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      isActive: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      isActive: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      isActive: !authStatus,
    },
  ];

  return (
    <header>
      <nav>
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div>
          <ul>
            {navItems.map((item) =>
              item.isActive ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
} 

export default Header;
