import { BsPersonCircle, BsFillHouseFill } from "react-icons/bs";
import { IoBookmarks, IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
interface MobileMenuProps {
    mobileMenu: string
}
export default function MobileMenu(props: MobileMenuProps) {
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
        <div className={props.mobileMenu}>
            <div className="h-full m-4 flex">
                <div className="flex flex-col gap-10">
                    <Link to={'/homepage'}>
                        <div className="flex items-center gap-2">
                            <BsFillHouseFill className="text-4xl" />
                            <p className="text-xl">Home</p>
                        </div>
                    </Link>
                    {/* <div className="flex items-center gap-2">
                        <BsFillBellFill className="text-4xl" />
                        <p className="text-xl">Notifications</p>
                    </div> */}
                    {/* <div className="flex items-center gap-2">
                        <BsEnvelopeFill className="text-4xl" />
                        <p className="text-xl">Messages</p>
                    </div> */}
                    <Link to={'/bookmarks'} state={{ from: 'user' }}>
                        <div className="flex items-center gap-2">
                            <IoBookmarks className="text-4xl" />
                            <p className="text-xl">Bookmarks</p>
                        </div>
                    </Link>
                    {/* <div className="flex items-center gap-2">
                        <GiBookCover className="text-4xl" />
                        <p className="text-xl">Clubs</p>
                    </div> */}
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
                    <a className="text-blue-500 underline" href="https://cadencehiggins.notion.site/Book-Nest-Release-Notes-104e758b497780c2b45bd03cf7ec486b" target="_blank">Release Notes</a>
                </div>
            </div>
        </div>
    )
}