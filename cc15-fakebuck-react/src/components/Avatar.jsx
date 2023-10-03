import defaultImage from "../assets/blank.jpeg";
export default function Avatar({ className = "h-10" }) {
  const defaultClass = "rounded-full aspect-square";
  const classes = defaultClass + " " + className;
  return <img src={defaultImage} alt="user" className={classes} />;
}
