import { createContext, useContext, useState, useEffect } from "react";
import { BlockchainContext } from "./blockchain";

export const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [transaction, setTransaction] = useState("");
  const { contract, ipfsClient } = useContext(BlockchainContext);

  useEffect(() => {
    const getPosts = async () => {
      const count = await contract.postCount();
      let posts = [];
      for (let i = 1; i <= count; i++) {
        const post = await contract.posts(i);
        posts.push(post);
      }
      setBlogs(posts);
    };
    contract.on("PostPublished", () => {
      setTransaction("");
      getPosts();
    });

    contract.on("PostUpdated", () => {
      getPosts();
    });

    return () => {
      contract.off("PostPublished");
      contract.off("PostUpdated");
    };
  }, [contract]);

  const createBlog = async (data) => {
    const file = await ipfsClient.add(data.attachment);
    const transaction = await contract.createPost({
      title: data.title,
      attachmentHash: file.path,
      content: data.content,
    });
    setTransaction(transaction.hash);
  };

  const votePost = async (postId, vote) => {
    await contract.votePost(postId, vote);
  };

  const contextValue = {
    createBlog,
    blogs,
    votePost,
    transaction,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

export default MainProvider;
