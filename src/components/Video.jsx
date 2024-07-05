import React, { useEffect, useState } from "react";
 
import video1 from "../images/video-1.mp4";
import { FaCompass } from "react-icons/fa";


 function Video() {
    return (
        <div className="videoHead">
          <div className="video-background">
        <video autoPlay muted loop id="background-video">
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

    

      <div className="tagLine">
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
      </div>
        </div>
    )
 }
 
 export default Video
 