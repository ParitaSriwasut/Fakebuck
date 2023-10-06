import { useAuth } from "../../hooks/use-auth";
import { MessageIcon, ThumbsUpAltIcon, ThumbsUpIcon } from "../../icons";
import ActionButton from "./ActionButton";

export default function PostFooter({ postObj }) {
  const { totalLike, likes } = postObj;
  const { authUser } = useAuth();

  // [ { userId: 1 }, { userId: 2 } ]
  const isLiked = likes.find((el) => el.userId === authUser.id);
  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        {totalLike > 0 && (
          <div className="flex gap-1 items-center">
            <div className="bg-blue-500 h-5 w-5 rounded-full flex items-center justify-center">
              <ThumbsUpIcon />
            </div>
            <span className="text-sm text-gray-500">{totalLike}</span>
          </div>
        )}
        <span className="text-sm text-gray-500 hover:underline cursor-pointer">
          8 Comments
        </span>
      </div>
      <hr />
      <div className="flex gap-1 py-1">
        <ActionButton active={isLiked}>
          <div className="flex justify-center items-center gap-2">
            <ThumbsUpAltIcon
              className={isLiked ? "fill-blue-600" : "fill-gray-500"}
            />
            <span>Like</span>
          </div>
        </ActionButton>
        <ActionButton>
          <div className="flex justify-center items-center gap-2">
            <MessageIcon className="fill-gray-500" />
            <span>Comment</span>
          </div>
        </ActionButton>
      </div>
    </div>
  );
}
