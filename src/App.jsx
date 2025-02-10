import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/features/authSlice.js";
import authService from "./appwrite/auth.service.js";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index.js";
import { Layout } from "./components/index.js";
import config from "./config.js";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div>
        <Header />
        <main>
          <Layout>
            <Outlet />
          </Layout>
        </main>
        <Footer />
      </div>
    </>
  ) : (
    <div className=" text-3xl font-bold">Loading...</div>
  );
}

export default App;
