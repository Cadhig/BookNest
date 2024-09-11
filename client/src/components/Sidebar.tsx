import { BsPersonCircle, BsFillHouseFill, BsFillBellFill, BsEnvelopeFill } from "react-icons/bs";
import { IoBookmarks, IoSettingsSharp } from "react-icons/io5";
import { GiBookCover } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [username, setUsername] = useState()
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/loggedInUser`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(response => setUsername(response[0].username))
    }, [])
    return (
        <div className="hidden lg:flex lg:w-1/4 ml-2 h-full default-font">
            <div className="flex flex-col gap-8">
                <div className="flex items-center p-2">
                    <Link to={'/homepage'}>
                        <div className="header-font text-4xl text-book-dark hidden lg:flex">BookNest</div>
                    </Link>
                </div>
                <Link to={'/homepage'}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                        <BsFillHouseFill className="text-4xl" />
                        <p className="text-xl">Home</p>
                    </div>
                </Link>
                <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                    <BsFillBellFill className="text-4xl" />
                    <p className="text-xl">Notifications (coming soon)</p>
                </div>
                <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                    <BsEnvelopeFill className="text-4xl" />
                    <p className="text-xl">Messages (coming soon)</p>
                </div>
                <Link to={'/bookmarks'} state={{ from: 'user' }}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                        <IoBookmarks className="text-4xl" />
                        <p className="text-xl">Bookmarks</p>
                    </div>
                </Link>
                <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                    <GiBookCover className="text-4xl" />
                    <p className="text-xl">Clubs (coming soon)</p>
                </div>
                <Link to={'/profile'} state={{ from: username }}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                        <BsPersonCircle className="text-4xl" />
                        <p className="text-xl">Profile</p>
                    </div>
                </Link>
                <Link to={'/settings'}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                        <IoSettingsSharp className="text-4xl" />
                        <p className="text-xl">Settings</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}