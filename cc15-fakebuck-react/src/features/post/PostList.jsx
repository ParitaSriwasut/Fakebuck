import PostItem from "./PostItem";

export default function PostList({ allPost, deletePost }) {
  return (
    <div className="flex flex-col gap-4">
      {allPost.map((el) => (
        <PostItem key={el.id} postObj={el} deletePost={deletePost} />
      ))}
    </div>
  );
}
