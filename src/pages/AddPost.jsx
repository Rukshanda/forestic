import React from 'react'
import Container from '../components/Container'
import PostForm from '../components/PostForm'
function AddPost() {
  return (
    <div className='addPostSec mt-[40px] mb-[80px]'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost