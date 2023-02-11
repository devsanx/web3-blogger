import { useContext } from "react";
import Header from "../views/header";
import PostFeed from "../views/post-feed";
import CreatePost from "../views/create-post";
import { MetamaskContext } from "../contexts/metamask";

const Main = () => {
  const { wallet } = useContext(MetamaskContext);

  return (
    <main>
      <Header />
      <div className="container">
        {!wallet.length > 0 ? (
          <div className="alert alert-warning mt-3" role="alert">
            You are not logged in. Some features may be unavailable.
          </div>
        ) : null}
        <div className="row">
          <div className="col-8 overflow-auto" style={{ maxHeight: "100vh" }}>
            <PostFeed />
          </div>
          <div className="col-4">
            <CreatePost />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
