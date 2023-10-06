import { useParams } from "react-router-dom";
import ActionButton from "./ActionButton";
import axios from "../../config/axios";

export default function UnknownAction({ setStatusWithAuthUser }) {
  const { profileId } = useParams();

  const handleClickCancel = async () => {
    try {
      await axios.delete(`/friend/${profileId}/cancel`);
      setStatusWithAuthUser("UNKNOWN");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ActionButton onClick={handleClickCancel}>Cancel request</ActionButton>
  );
}
