import React, { useEffect, useState } from "react";
import postServices from "../appwrite/postServices";

import Container from "../components/Container";
import PostCard from "../components/PostCard.jsx";
import Accounts from "../components/Accounts.jsx";
import Loader from "../components/Loader.jsx"; // Import your Loader component
import About from "../components/About.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Video from "../components/Video.jsx";
import Gallery from "../components/Gallery.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    postServices.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false); // Set loading to false after posts are fetched
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle
                className="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
            </svg>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="homeSec">
      <Video/>
      <About />
      <Testimonials />
      <div className="w-full featured">
        <div className="pt-[40px] pb-[40px]">
          <Container>
            <div className="w-[100%] featured-cards">
              <div className="featured-cards--sec">
                <h3 className="ml-[5px] pb-[20px]">Featured Reads </h3>
                <div className="flex w-[100%] flex-row text-[black] justify-center items-center">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.$id} className="p-2">
                      <PostCard
                        {...post}
                        className="postBox"
                        imageClassName="post-img"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Gallery/>
    </div>
  );
}

export default Home;
