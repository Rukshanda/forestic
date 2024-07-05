import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import postServices from "../appwrite/postServices";
import fileServices from "../appwrite/fileServices";

export default function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authentication.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const fetchedPost = await postServices.getPost(id);
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      }
    };

    fetchPost();
  }, [id, navigate]);

  const deletePost = () => {
    postServices.deletePost(post.$id).then((status) => {
      if (status) {
        fileServices.deleteFile(post.postImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 pt-[100px] pb-[100px] postPage--sec">
      <Container>
        <div className="w-[100%]">
        <div className="">
          <div className="flex justify-center flex-col items-center w-[100%]">
            <div className="flex justify-center mb-4 relative w-[800px] h-[550px]  p-2">
              <img
                src={fileServices.getFilePreview(post.postImage)}
                alt={post.title}
                className="rounded-xl w-full h-full"
              />
              {isAuthor && (
                <div className="absolute right-3 top-[-3.5rem]">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3">
                      Edit
                    </Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className=" flex flex-col justify-center items-center w-[770px]">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mt-[10px] mb-[20px]">{post.title}</h1>
                <div className="">{parse(post.content)}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
       
      </Container>
    </div>
  ) : null;
}
