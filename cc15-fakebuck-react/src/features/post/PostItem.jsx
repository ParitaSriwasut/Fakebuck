import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export default function PostItem({ postObj, deletePost }) {
  return (
    <div className="bg-white px-4 pt-3 border shadow rounded-lg">
      <PostHeader postObj={postObj} deletePost={deletePost} />
      <PostContent message={postObj.message} image={postObj.image} />
      <PostFooter postObj={postObj} deletePost={deletePost} />
    </div>
  );
}
