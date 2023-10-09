import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { RightFromBracketIcon } from "../icons";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useEffect } from "react";
import { useRef } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownEl = useRef(null);

  const { logout, authUser } = useAuth();

  useEffect(() => {
    // console.log("effect", dropDownEl);
    const handleClickOutside = (e) => {
      if (!dropDownEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropDownEl}>
      {/* from null it'll update  dropDownEl {current : object <div class='relative'> }*/}
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Avatar src={authUser.profileImage} />
      </div>

      {isOpen && (
        <div className="w-96 absolute bg-white right-0 translate-y-1 border rounded-lg shadow-xl">
          <Link to={`/profile/${authUser.id}`} onClick={() => setIsOpen(false)}>
            <div className=" flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100">
              <Avatar src={authUser.profileImage} />
              <div>
                <div className="font-semibold">
                  {authUser.firstName} {authUser.lastName}
                </div>
                <div className="text-sm text-gray-400">See your profile</div>
              </div>
            </div>
          </Link>
          <hr className="m-2 border" />
          <div
            className="flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-md"
            onClick={logout}
          >
            <div className="bg-gray-300 h-9 aspect-square rounded-full flex justify-center items-center">
              <RightFromBracketIcon />
            </div>
            <div className="font-semibold text-sm">Log Out</div>
          </div>
        </div>
      )}
    </div>
  );
}
