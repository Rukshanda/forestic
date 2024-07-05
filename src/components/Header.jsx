import React, { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/authServices";
import video1 from "../images/video-1.mp4";
import { FaCompass } from "react-icons/fa";

function Header() {
  const authStatus = useSelector((state) => state.authentication.status);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];

  useEffect(() => {
    authService.isLogedIn().then((userData) => {
      setName(userData.name);
    });
  }, []);

  return (
    <header className="header">
      {/* <div className="video-background">
        <video autoPlay muted loop id="background-video">
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}

      <div className="headerBg">
        <Container>
          <div className="flex flex-row justify-between items-center">
            <div className="pt-[10px] pb-[10px]">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            <ul className="navBox flex flex-row">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="text-[1.3rem]">
                      <button
                        onClick={() => navigate(item.slug)}
                        className="inline-bock duration-200 buttonHover"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </Container>
      </div>

      {/* <div className="tagLine">
        <h1 className="tagLine--text">
          <span className="text-[4rem] text-[#0b2b26]">Trees</span> <br />
          <span className="text-[#163832] text-[3.5rem]">Nature's Greatest Teachers</span>
        </h1>
        <p className="w-[50%]">
        Foesteric is a sanctuary for personal and collective growth, inspired by the beauty and resilience of nature. With a serene dark forest theme, we offer diverse content on mindfulness and sustainable living. Our supportive community fosters meaningful connections, making Foesteric a haven for growth enthusiasts.        </p>
        <div className="button">
          <button className="header-btn flex items-center justify-between w-[195px]"><span>
          Discover
            </span>  <span>
            <FaCompass  className="text-[1.5rem]"/>
              </span>  </button>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
