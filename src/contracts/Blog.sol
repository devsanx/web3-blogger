// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Blog {
    address public owner = msg.sender;
    uint256 public postCount = 0;
    mapping(uint256 => BlogPost) public posts;

    struct BlogPost {
        uint256 id;
        address autherAddress;
        string title;
        string attachmentHash;
        string content;
        uint256 upvotes;
        uint256 downvotes;
    }

    struct Post {
        string title;
        string attachmentHash;
        string content;
    }

    event PostPublished(uint256 id);
    event PostUpdated(uint256 id);

    function createPost(Post memory _data) public {
        postCount++;
        posts[postCount] = BlogPost(
            postCount,
            owner,
            _data.title,
            _data.attachmentHash,
            _data.content,
            0,
            0
        );
        emit PostPublished(postCount);
    }

    function votePost(uint256 _postId, string memory _type) public {
        BlogPost memory _blog = posts[_postId];
        if (keccak256(bytes(_type)) == keccak256(bytes("up"))) {
            _blog.upvotes = _blog.upvotes + 1;
        } else {
            _blog.downvotes = _blog.downvotes + 1;
        }
        posts[_postId] = _blog;
        emit PostUpdated(_postId);
    }
}
