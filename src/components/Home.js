import axios from "axios";
import Posts from "./Posts.js";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("https://dummyjson.com/posts");
      console.log(res.data.posts);
      setPosts(res.data.posts)

    }
    fetchPost();
  }, []);
  return <div>
    {posts?.map((post,idx)=>(
      <Posts key={post.id} post={post}/>
    ))}
  </div>;
};

export default Home;
