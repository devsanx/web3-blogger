import { useContext } from "react";
import { MainContext } from "../contexts/main";
import { MetamaskContext } from "../contexts/metamask";
import { IPFS_URL } from "../constants/main";

const Post = (props) => {
  const { votePost } = useContext(MainContext);
  const { wallet } = useContext(MetamaskContext);

  const upvotePost = () => {
    votePost(props.id, "up");
  };

  const downvotePost = () => {
    votePost(props.id, "down");
  };

  return (
    <div className="card my-3">
      <div className="card-header d-flex justify-content-between">
        <span>Posted By: {props.autherAddress}</span>
        <a
          type="button"
          className="btn btn-outline-secondary btn-sm"
          href={`${IPFS_URL}/${props.attachmentHash}`}
        >
          Open Image
        </a>
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <img
          src={`${IPFS_URL}/${props.attachmentHash}`}
          className="img-thumbnail rounded mx-auto d-block my-2"
          alt={props.title}
          style={{ maxHeight: 300 }}
        />
        <p className="card-text">{props.content}</p>
        <div className="d-flex ">
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={upvotePost}
            disabled={!wallet.length > 0}
          >
            Upvote{" "}
            <span className="badge bg-dark">{props.upvotes.toString()}</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={downvotePost}
            disabled={!wallet.length > 0}
          >
            Downvote{" "}
            <span className="badge bg-dark">{props.downvotes.toString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
