import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { RightFromBracketIcon } from "../icons";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useAuth } from "../hooks/use-auth";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownEl = useRef(null); //{current : null}
  //dropDownEl {current : obj <div class="relative"></div>}
  const { logout, authUser } = useAuth();

  // useEffect(() => {
  //   const fn = () => console.log("clicked!");
  //   document.addEventListener("click", fn);
  //   document.removeEventListener("click", fn);
  // }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // isOpen(false);
      if (!dropDownEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropDownEl}>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Avatar />
      </div>
      {isOpen && (
        <div className=" w-96 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl p-2">
          <Link to="/profile/rita" onClick={() => setIsOpen(false)}>
            <div className="flex gap-4 p-2 items-center rounded-xl hover:bg-gray-200">
              <Avatar className="h-14" />
              <div>
                <div className="font-semibold">
                  {authUser.firstName} {authUser.lastName}
                </div>
                <div className="text-sm text-gray-500">See your profile</div>
              </div>
            </div>
          </Link>
          <hr className="m-2 border-gray-200" />
          <div
            className="flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-xl"
            onClick={logout}
          >
            <div className="bg-gray-300 h-9 aspect-square rounded-full flex justify-center items-center">
              <RightFromBracketIcon />
            </div>
            <div className="font-semibold text-sm"> Log out</div>
          </div>
        </div>
      )}
    </div>
  );
}
