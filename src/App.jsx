import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/authServices";
import { login, logout } from "./features/authSlice";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import './index.css';
import Loader from "./components/Loader";
  
function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await authService.isLogedIn();
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    };

    loadUser();

    // Set a timeout for the loader to show for 2 seconds
    const loaderTimeout = setTimeout(() => {
      setLoaded(true);
    }, 2500); // Adjust the duration as needed (2000ms = 2 seconds)

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(loaderTimeout);
  }, [dispatch]);

  if (!loaded) {
    return <Loader />; // Render a loader while waiting for authentication check
  }

  return (
   
    <div className={`body ${loaded ? "loaded" : ""}`}>
      <div className="main-bg">
 

        <div className="">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
