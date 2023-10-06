import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export default function PostItem({ postObj }) {
  return (
    <div className="bg-white px-4 pt-3 border shadow rounded-lg">
      <PostHeader postObj={postObj} />
      <PostContent message={postObj.message} image={postObj.image} />
      <PostFooter postObj={postObj} />
    </div>
  );
}
