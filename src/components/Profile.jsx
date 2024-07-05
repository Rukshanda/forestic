import React, { useEffect, useState } from "react";
import postServices from "../appwrite/postServices";
import authService from "../appwrite/authServices"; // Ensure this is correctly imported
import PostCard from "./PostCard.jsx";
import Loader from "./Loader.jsx";

function stripHtmlTags(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function Profile() {
  const [posts, setPosts] = useState([]);
  const [userID, setUserID] = useState(null);
  const [name, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    postServices.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setIsLoading(false); // Set loading to false once data is fetched
        posts.documents.forEach((doc) => {
          console.log(doc.userId); // Ensure that you use 'userId' which is the correct property name
        });
      }
    });
  }, []);

  useEffect(() => {
    async function fetchUserId() {
      try {
        const logStatus = await authService.isLogedIn();
        if (logStatus && logStatus.$id) {
          setUserID(logStatus.$id);
          setUserName(logStatus.name);
          console.log("User ID:", logStatus.$id);
        } else {
          console.log("User not logged in");
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    }

    fetchUserId();
  }, []);

  // Filter posts to only include those created by the logged-in user
  const userPosts = posts.filter((post) => post.userId === userID);

  return (
    <div className="profile-sec">
      {isLoading ? (
         <Loader/> // Show loading state while fetching data
      ) : (
        <div>
          <div className="userText">
            <h3 className="profile-name">{name}</h3>
            <h4 className="profile-id text-center text-[1rem]">{userID}</h4>
          </div>
          <div className="profile-posts--sec">
            <h3 className="profile-heading">{name} your Posts are Here</h3>

            <div className=" ">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <div className="" key={post.$id}>
                    <PostCard
                    className="AllPost-postBox"
                        imageClassName="AllPost-post-img"
                      $id={post.$id}
                      title={post.title}
                      postImage={post.postImage}
                      postContent={stripHtmlTags(post.content)
                        
                      } // Clean the content before passing it
                    />
                  </div>
                ))
              ) : (
                <p>No posts found for the logged-in user.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
