import { useContext } from "react";
import Post from "../components/post";
import { MainContext } from "../contexts/main";

const PostFeed = () => {
  const { blogs } = useContext(MainContext);

  return (
    <>
      {blogs
        .sort((a, b) => b.upvotes - a.upvotes)
        .map((post, index) => (
          <Post {...post} key={index} />
        ))}
    </>
  );
};

export default PostFeed;
