import React from "react"; 
 import gal1 from "../images/gal-1.jpg"
 import gal2 from "../images/gal-2.jpg"
 import gal3 from "../images/gal-3.jpg"
 import gal4 from "../images/gal-4.jpg"
 import gal5 from "../images/gal-5.jpg"
 import gal6 from "../images/gal-6.jpg"
 import gal7 from "../images/gal-7.jpg"
 import gal8 from "../images/gal-8.jpg"
 import gal9 from "../images/gal-9.jpeg"
 import gal10 from "../images/gal-10.jpeg"
 import gal11 from "../images/gal-11.jpeg"
 import gal12 from "../images/gal-12.jpeg"


const images = [
   { id: 2, src: gal3, alt: "Image 2" },
  { id: 3, src: gal4, alt: "Image 3" },
  { id: 4, src: gal5, alt: "Image 4" },
  { id: 5, src: gal11, alt: "Image 5" },
  { id: 7, src: gal12, alt: "Image 7" },
  { id: 8, src: gal1, alt: "Image 8" },
  { id: 9, src: gal6, alt: "Image 9" },
  { id: 10, src: gal7, alt: "Image 10" },
  { id: 11, src: gal8, alt: "Image 11" },
 
];

function Gallery() {
  return (
    <div className="gallery-sec">
        <h1>
            Our Favourites
        </h1>
      <div className="gallery">
        <div className="gallery-box">
          <div className="gallery-items">
            {images.map((image) => (
              <div className="g-items" key={image.id}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
