import React from "react";
 import person1 from "../images/person-1.jpg"
import person2 from "../images/person-2.jpg"
import person3 from "../images/person-3.jpg"
import person4 from "../images/person-4.jpg"
import Logo from "./Logo"

import {
  FaCcDiscover,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <div className="footer-sec">
      <div className="footer flex flex-row justify-around items-center w-[100%]">
        <div className="footer-logo w-[35%] flex flex-col">
          <div className="footer-logo--img">
            <Logo className="footerLogo"/>
          </div>
          <div className="footer-logo--text">
          Foesteric is your sanctuary for personal growth, inspired by the beauty of nature. Join our community for insights on mindfulness, sustainability, and holistic development.
          </div>

          <div className="footer-social">
          <div className="social-icons">
            <ul className="flex flex-row w-[80%] items-center justify-between text-[1.5rem] mb-[10px] font-[800]" >
              <li className="iconBg">
                <FaFacebookF />
              </li>
              <li className="iconBg">
                <FaInstagram />
              </li>
              <li className="iconBg">
                <FaPinterestP />
              </li>
              <li className="iconBg">
                <FaXTwitter />
              </li>
            </ul>
          </div>
          <div className="card-icons">
            <ul className="flex flex-row w-[80%] items-center justify-between text-[1.5rem] font-[800]">
              <li className="iconBg">
                <FaCcPaypal />
              </li>
              <li className="iconBg">
                <FaCcDiscover />
              </li>
              <li className="iconBg">
                <FaCcMastercard />
              </li>
              <li className="iconBg">
                <FaCcVisa />
              </li>
            </ul>
          </div>
        </div>
        </div>
        <div className="footer-info w-[15%] ">
          <h3 className="tag-txt">Informtion</h3>
          <ul className="flex flex-col w-[100%] justify-center">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
            <li>FAQ</li>
          </ul>

          
        </div>
        <div className="footer-contributer w-[15%] ">
          <ul className="flex flex-col  justify-center">
          <h3 className="tag-txt">Our Team</h3>

            <li className="flex flex-row items-center justify-between w-[180px] p-[4px] mt-[4px]">
              <span className="contributer-img">
                <img src={person1} alt="" className="w-[50px] h-[50px] rounded-full"/>
              </span>
              <span className="contirbuter-name">Jonas smith</span>
            </li>
            <li className="flex flex-row items-center justify-between w-[180px] p-[4px] mt-[4px]">
              <span className="contributer-img">
                <img src={person2} alt="" className="w-[50px] h-[50px] rounded-full"/>
              </span>
              <span className="contirbuter-name">Olivia Rodger</span>
            </li>
            <li className="flex flex-row items-center justify-between w-[180px] p-[4px] mt-[4px]">
              <span className="contributer-img">
                <img src={person3} alt="" className="w-[50px] h-[50px] rounded-full"/>
              </span >
              <span className="contirbuter-name">Thomas Rover</span>
            </li>
            <li className="flex flex-row items-center justify-between w-[180px] p-[4px] mt-[4px]">
              <span className="contributer-img">
                <img src={person4} alt="" className="w-[50px] h-[50px] rounded-full"/>
              </span>
              <span className="contirbuter-name">Vince Simon</span>
            </li>
          </ul>
        </div>
   
       
      </div>
    </div>
  );
}

export default Footer;
