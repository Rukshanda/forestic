import React from 'react'
import plant1 from "../images/plant-1.jpg"
import plant2 from "../images/plant-2.jpg"
import plant3 from "../images/plant-3.jpg"

function About() {
    return (
        <div className='about-sec'>
<div className="about flex flex-row justify-around items-center">
    <div className="about--para w-[30%]">
    <div className="about-heading">
        About Foesteric
    </div>
    <div className="about-text">
    Welcome to Foesteric, a unique blogging site inspired by the profound and tranquil beauty of the forest. Just as trees grow and thrive through the seasons, our platform is dedicated to fostering personal and collective growth. Here at Foesteric, we believe in the power of steady, organic development, mirroring the intricate ecosystems found in nature.
    </div>
    </div>
    <div className="about-imgs w-[25%]">
        <div className='flex flex-row items-center img1'>
            <div className='w-[200px] h-[150px] mr-[5px]'>
            <img src={plant1} alt=""  className='w-full h-full'/>

            </div>
            <div className='w-[200px] h-[150px] ml-[5px]'>
            <img src={plant2} alt="" className='w-full h-full'/>

            </div>
        </div>
        
        <div className='img2'>
         <div className='w-[391px] h-[200px]'>
         <img src={plant3} alt=""  className='w-full h-full' />

         </div>
        </div>

    </div>
</div>
        </div>
    )
}

export default About
