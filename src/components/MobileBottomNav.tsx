import { Link, useLocation } from "react-router-dom";
import {
  MdHomeFilled,
  MdSubscriptions,
  MdVideoLibrary,
  MdPlayCircle,
  MdAccountCircle
} from "react-icons/md";

export default function MobileBottomNav() {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `flex flex-col items-center shrink-0 ${
      pathname.startsWith(path) ? "text-red-500" : "text-gray-400"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-card border-t border-yt px-3 py-2 flex justify-between z-50 md:hidden min-w-0">

      <Link to="/home" className={linkClass("/home")}>
        <MdHomeFilled size={26} />
      </Link>

      <Link to="/projects" className={linkClass("/projects")}>
        <MdSubscriptions size={26} />
      </Link>

      <Link to="/experiences" className={linkClass("/experiences")}>
        <MdVideoLibrary size={26} />
      </Link>

      <Link to="/certifications" className={linkClass("/certifications")}>
        <MdPlayCircle size={26} />
      </Link>

      <Link to="/channel/maneesh" className={linkClass("/channel")}>
        <MdAccountCircle size={26} />
      </Link>
    </nav>
  );
}
