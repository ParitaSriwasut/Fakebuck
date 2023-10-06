import ActionButton from "./ActionButton";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";

export default function UnknownAction({ setStatusWithAuthUser }) {
  const { profileId } = useParams();
  const handleClickAddFriend = async () => {
    try {
      await axios.post(`/friend/${profileId}`);
      setStatusWithAuthUser("REQUESTER");
    } catch (err) {
      console.log(err);
    }
  };
  return <ActionButton onClick={handleClickAddFriend}>Add friend</ActionButton>;
}
