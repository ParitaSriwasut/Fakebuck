import Avatar from "../../components/Avatar";
import AuthUserAction from "./AuthUserAction";
import UnknownAction from "./UnknownAction";
import FriendAction from "../profile/FriendAction";
import RequesterAction from "../profile/RequesterAction";

export default function ProfileInfo({ profileUser }) {
  return (
    <div className="max-w-6xl mx-auto flex gap-4 px-4 items-end">
      <div className="-mt-8">
        <Avatar
          className="h-40 outline outline-3.5 outline-white"
          src={profileUser.profileImage}
        />
      </div>
      <div className="flex-1 mb-2">
        <h2 className="text-2xl font-bold">
          {profileUser.firstName} {profileUser.lastName}
        </h2>
        <span className="block text-gray-500 font-semibold mb-2">
          7 Friends
        </span>
        <div className="flex -space-x-2">
          <Avatar className="h-8" />
          <Avatar className="h-8" />
          <Avatar className="h-8" />
          <Avatar className="h-8" />
          <Avatar className="h-8" />
          <Avatar className="h-8" />
        </div>
      </div>
      <div>
        {/* <RequesterAction /> */}
        {/* <FriendAction /> */}
        <AuthUserAction />
      </div>
    </div>
  );
}
