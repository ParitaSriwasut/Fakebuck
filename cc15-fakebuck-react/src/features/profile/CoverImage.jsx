import defaultImage from "../../assets/cover3.jpeg";

export default function CoverImage({ src }) {
  return <img src={src || defaultImage} alt="cover" />;
}
