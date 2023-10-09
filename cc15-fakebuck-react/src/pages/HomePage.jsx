import { useState } from "react";
import CreatePostButton from "../features/post/CreatePostButton";
import PostList from "../features/post/PostList";
import { useEffect } from "react";
import axios from "../config/axios";

export default function HomePage() {
  const [allPost, setAllPost] = useState([]);

  const createPost = async (data) => {
    const res = await axios.post("/post", data);
    const newPost = res.data.post;
    setAllPost([newPost, ...allPost]);
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/post/${postId}`);
      setAllPost(allPost.filter((el) => el.id !== postId));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get("/post/friend")
      .then((res) => {
        setAllPost(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[44rem] mx-auto px-8 py-6 flex flex-col gap-4">
      <CreatePostButton createPost={createPost} />
      <PostList allPost={allPost} deletePost={deletePost} />
    </div>
  );
}
