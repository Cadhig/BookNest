import { BsPersonCircle, BsFillHouseFill } from "react-icons/bs";
import { IoBookmarks, IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MobileMenu() {
    const [username, setUsername] = useState<string>()

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
        <div className="absolute z-50 lg:hidden flex items-center justify-evenly p-3 bottom-0 w-full bg-white">
            <Link to={'/homepage'}>
                <BsFillHouseFill className="text-4xl" />
            </Link>
            <Link to={'/bookmarks'} state={{ from: 'user' }}>
                <IoBookmarks className="text-4xl" />
            </Link>
            <Link to={'/profile'} state={{ from: username }}>
                <BsPersonCircle className="text-4xl" />
            </Link>
            <Link to={'/settings'}>
                <IoSettingsSharp className="text-4xl" />
            </Link>
        </div>
    )
}