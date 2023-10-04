import CoverImage from "./CoverImage";

export default function ProfileCover({ coverImage }) {
  return (
    <div className="max-w-6xl max-h-96 overflow-hidden mx-auto rounded-b-lg justify-center items-center">
      <CoverImage src={coverImage} />
    </div>
  );
}
