import Avatar from "../../components/Avatar";
import CoverImage from "./CoverImage";
import PictureForm from "./PictureForm";
import { useAuth } from "../../hooks/use-auth";
import { useState } from "react";
import Loading from "../../components/Loading";

export default function EditProfileForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { authUser, updateProfile } = useAuth();
  console.log(authUser);
  const uploadProfileImage = async (input) => {
    try {
      //FormData
      const formData = new FormData();
      formData.append("profileImage", input);
      setLoading(true);
      await updateProfile(formData);
      onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const uploadCoverImage = async (input) => {
    try {
      //FormData
      const formData = new FormData();
      formData.append("coverImage", input);
      setLoading(true);
      await updateProfile(formData);
      onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {loading && <Loading />}
      <PictureForm
        title="Profile picture"
        initialSrc={authUser.profileImage}
        onSave={uploadProfileImage}
      >
        {(src, onClick) => (
          <div onClick={onClick}>
            <Avatar className="h-40" src={src} />
          </div>
        )}
      </PictureForm>

      <PictureForm
        title="cover photo"
        initialSrc={authUser.coverImage}
        onSave={uploadCoverImage}
      >
        {(src, onClick) => (
          <div
            className="aspect-[3/1] overflow-hidden rounded-md flex items-center justify-center"
            onClick={onClick}
          >
            <CoverImage src={src} />
          </div>
        )}
      </PictureForm>
    </div>
  );
}
