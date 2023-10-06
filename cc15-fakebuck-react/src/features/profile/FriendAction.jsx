import ActionButton from "./ActionButton";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";

export default function FriendAction({ setStatusWithAuthUser }) {
  const { profileId } = useParams();

  const handleClickUnfriend = async () => {
    try {
      await axios.delete(`/friend/${profileId}/unfriend`);
      setStatusWithAuthUser("UNKNOWN");
    } catch (err) {
      console.log(err);
    }
  };
  return <ActionButton onClick={handleClickUnfriend}>Unfriend</ActionButton>;
}
