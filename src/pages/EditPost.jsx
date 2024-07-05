import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import PostForm from '../components/PostForm';
import postServices from "../appwrite/postServices";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (id) {
                    console.log("Fetching post with id:", id);
                    const fetchedPost = await postServices.getPost(id);
                    if (fetchedPost) {
                        console.log("Fetched post:", fetchedPost);
                        setPost(fetchedPost);
                    } else {
                        navigate('/');
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error("Error fetching post:", error);
                navigate('/');
            }
        };

        fetchPost();
    }, [id, navigate]);

    return post ? (
        <div className=''>
            <Container>
                <div  className='mt-[50px] mb-[50px] p-[50px]'>
                <PostForm post={post} />

                </div>
            </Container>
        </div>
    ) : null;
}

export default EditPost;
