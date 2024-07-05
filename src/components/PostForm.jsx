import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import Select from "./Select";
import fileServices from "../appwrite/fileServices";
import postServices from "../appwrite/postServices";
import Loader from "./Loader";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.authentication.userData);
  const [postImageUrl, setPostImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (post && post.postImage) {
      const fetchImageUrl = async () => {
        const url = await fileServices.getFilePreview(post.postImage);
        setPostImageUrl(url);
      };
      fetchImageUrl();
    }
  }, [post]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a delay of 1 second
    return () => clearTimeout(timer);
  }, []);

  const submit = async (data) => {
    if (!userData) {
      console.error("User data is not available");
      return;
    }

    let fileId;

    if (data.image && data.image[0]) {
      const file = await fileServices.uploadFile(data.image[0]);
      fileId = file.$id;
    }

    const postData = {
      ...data,
      postImage: fileId || (post ? post.postImage : undefined),
      userId: userData.$id,
      userName: userData.name,
    };

    try {
      if (post) {
        const dbPost = await postServices.updatePost(post.$id, postData);
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const dbPost = await postServices.createPost(postData);
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col">
      <h1 className="addPost-mainHeading">Write Your Thoughts Here</h1>
      <div className="addPost-1">
        <Input
          labelClass="addLabel"
          label="Title :"
          placeholder="Write You Title Here"
          className="mb-4 addInput"
          {...register("title", { required: true })}
        />
        <RTE
          labelClass="addLabel"
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="addPost-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 imgInput"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.postImage && postImageUrl && (
          <div className="w-full mb-4">
            <img src={postImageUrl} alt={post.title} className="rounded-lg w-full h-full" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full submitBtn"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
