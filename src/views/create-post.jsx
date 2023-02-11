import Input from "../components/input";
import { useRef, useContext } from "react";
import Textarea from "../components/textarea";
import { MainContext } from "../contexts/main";
import { MetamaskContext } from "../contexts/metamask";

const CreatePost = () => {
  const { createBlog, transaction } = useContext(MainContext);
  const { wallet } = useContext(MetamaskContext);

  const titleRef = useRef();
  const attachmentRef = useRef();
  const contentRef = useRef();

  const handlePost = () => {
    createBlog({
      title: titleRef.current.value,
      attachment: attachmentRef.current.files[0],
      content: contentRef.current.value,
    });
    titleRef.current.value = "";
    attachmentRef.current.files = null;
    contentRef.current.value = "";
  };

  return (
    <>
      {wallet?.length > 0 ? (
        <div className="alert alert-light" role="alert">
          Logged in as {wallet}
        </div>
      ) : null}
      <blockquote className="blockquote text-muted">
        share what's on your mind!
      </blockquote>
      <div className="card my-3">
        <div className="card-body">
          <Input id="blogTitle" label="Title" ref={titleRef} />
          <Input
            id="blogImage"
            label="Image"
            type="file"
            ref={attachmentRef}
            accept="image/*"
          />
          <Textarea id="blogContent" label="Content" ref={contentRef} />
          <button
            className="btn btn-primary mt-4 w-100"
            onClick={handlePost}
            disabled={transaction.length > 0 || !wallet.length > 0}
          >
            {!transaction.length > 0 ? (
              "Post"
            ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
          {wallet?.length > 0 ? null : (
            <span className="d-block my-3 text-center text-warning">
              Login With Metamask To Create A Post
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePost;
