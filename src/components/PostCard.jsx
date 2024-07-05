import React, { useEffect, useState } from "react";
import fileServices from "../appwrite/fileServices";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function stripHtmlTags(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html || ""; // Handle undefined case
  const text = tmp.textContent || tmp.innerText || "";
  return text.length > 120 ? text.substring(0, 120) + "..." : text;
}


function PostCard({
  $id,
  title,
  postImage,
  content,
  className = "",
  imageClassName = "",
}) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await fileServices.getFilePreview(postImage);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, [postImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div
        className={`${className}`}
      >
        <div className="mb-6">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className={`${imageClassName}`}
            />
          ) : (
            <Loader/>
          )}
        </div>
        <div className="pt-[10px]">
          <p className="pl-2 font-bold text-lg uppercase">{title}</p>
          <p className="pl-2">{stripHtmlTags(content)}</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
