import { BsPersonCircle, BsFillHouseFill, BsFillBellFill, BsEnvelopeFill } from "react-icons/bs";
import { IoBookmarks, IoSettingsSharp } from "react-icons/io5";
import { GiBookCover } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
interface MobileMenuProps {
    mobileMenu: string
}
export default function MobileMenu(props: MobileMenuProps) {
    const [username, setUsername] = useState()

    useEffect(() => {
        fetch('http://localhost:3000/api/user/loggedInUser', {
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
        <div className={props.mobileMenu}>
            <div className="h-full m-4">
                <div className="flex flex-col gap-10">
                    <Link to={'/homepage'}>
                        <div className="header-font text-4xl text-book-dark">BookNest</div>
                    </Link>
                    <Link to={'/homepage'}>
                        <div className="flex items-center gap-2">
                            <BsFillHouseFill className="text-4xl" />
                            <p className="text-xl">Home</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <BsFillBellFill className="text-4xl" />
                        <p className="text-xl">Notifications</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BsEnvelopeFill className="text-4xl" />
                        <p className="text-xl">Messages</p>
                    </div>
                    <Link to={'/bookmarks'} state={{ from: 'user' }}>
                        <div className="flex items-center gap-2">
                            <IoBookmarks className="text-4xl" />
                            <p className="text-xl">Bookmarks</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <GiBookCover className="text-4xl" />
                        <p className="text-xl">Clubs</p>
                    </div>
                    <Link to={'/profile'} state={{ from: username }}>
                        <div className="flex items-center gap-2">
                            <BsPersonCircle className="text-4xl" />
                            <p className="text-xl">Profile</p>
                        </div>
                    </Link>
                    <Link to={'/settings'}>
                        <div className="flex items-center gap-2">
                            <IoSettingsSharp className="text-4xl" />
                            <p className="text-xl">Settings</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}