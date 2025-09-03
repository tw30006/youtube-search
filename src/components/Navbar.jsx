import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex gap-4">
        <Link to="/" className="font-bold text-lg">
          YouTube Analytics
        </Link>
        <Link to="/trending" className="hover:underline">
          熱門影片
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}
