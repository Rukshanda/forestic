import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard.jsx";
import Container from "../components/Container";
import postServices from "../appwrite/postServices";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await postServices.getPosts([]);
        if (fetchedPosts) {
          setPosts(fetchedPosts.documents);
          console.log(fetchedPosts); // Optional: Logging fetched data
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="w-full allPosts-sec">
      <h1 className="allPosts-mainHeading">All Reads</h1>
      <Container>
        <div className=" ">
          {posts.map((post) => (
            <div key={post.$id} className="flex flex-col">
              <PostCard {...post} 
               className="AllPost-postBox"
                        imageClassName="AllPost-post-img"
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
