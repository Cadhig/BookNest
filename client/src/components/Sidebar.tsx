import { BsPersonCircle, BsFillHouseFill, BsFillBellFill, BsEnvelopeFill } from "react-icons/bs";
import { IoBookmarks, IoSettingsSharp } from "react-icons/io5";
import { GiBookCover } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <div className="hidden md:flex md:w-1/4 ml-2 h-full default-font">
            <div className="flex flex-col gap-8">
                <Link to={'/homepage'}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/80">
                        <BsFillHouseFill className="text-4xl" />
                        <p className="text-xl">Home</p>
                    </div>
                </Link>
                <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/80">
                    <BsFillBellFill className="text-4xl" />
                    <p className="text-xl">Notifications (coming soon)</p>
                </div>
                <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/80">
                    <BsEnvelopeFill className="text-4xl" />
                    <p className="text-xl">Messages (coming soon)</p>
                </div>
                <Link to={'/bookmarks'} state={{ from: 'user' }}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/80">
                        <IoBookmarks className="text-4xl" />
                        <p className="text-xl">Bookmarks</p>
                    </div>
                </Link>
                <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/80">
                    <GiBookCover className="text-4xl" />
                    <p className="text-xl">Clubs (coming soon)</p>
                </div>
                <Link to={'/profile'} state={{ from: 'user' }}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/80">
                        <BsPersonCircle className="text-4xl" />
                        <p className="text-xl">Profile</p>
                    </div>
                </Link>
                <Link to={'/settings'}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/80">
                        <IoSettingsSharp className="text-4xl" />
                        <p className="text-xl">Settings</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}