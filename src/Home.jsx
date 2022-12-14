import axios from "axios";
import { useEffect, useState } from "react";
import { PostsNew } from "./PostsNew";
import { PostsIndex } from "./PostsIndex";
import { Modal } from "./Modal";
import { PostsShow } from "./PostsShow";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./Logout";

export function Home() {
  const [posts, setPosts] = useState([]);
  const [isBlogsShowModalVisible, setIsBlogsShowModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});

  const handleIndexPosts = () => {
    axios.get("http://localhost:3000/posts.json").then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  };

  const handleShowBlogs = (post) => {
    setIsBlogsShowModalVisible(true);
    setCurrentBlog(post);
  };

  const handleHideBlogs = () => {
    setIsBlogsShowModalVisible(false);
  };

  const handleCreatePost = (params) => {
    axios
      .post("http://localhost:3000/posts.json", params)
      .then((response) => {
        setPosts([...posts, response.data]);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        // setErrors(error.response.data.errors);
      });
  };

  const handleUpdatePost = (id, params) => {
    axios
      .patch("http://localhost:3000/posts/" + id + ".json", params)
      .then((response) => {
        console.log(response.data);
        setIsBlogsShowModalVisible(false);
        setPosts(
          posts.map((post) => {
            if (post.id === id) {
              return response.data;
            } else {
              return post;
            }
          })
        );
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  useEffect(handleIndexPosts, []);

  return (
    <div>
      <Login />
      <LogoutLink />
      <Signup />
      <PostsNew onCreatePost={handleCreatePost} />
      <PostsIndex posts={posts} onSelectBlog={handleShowBlogs} />
      {/* <button onClick={handleIndexPosts}> Load Posts</button> */}
      <Modal show={isBlogsShowModalVisible} onClose={handleHideBlogs}>
        <PostsShow post={currentBlog} onUpdatePost={handleUpdatePost} />
      </Modal>
    </div>
  );
}
