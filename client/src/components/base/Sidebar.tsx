import { BsPersonCircle, BsFillHouseFill } from "react-icons/bs";
import { IoBookmarks, IoSettingsSharp, IoCodeWorking } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate()

    async function api() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/loggedInUser`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const parsedResponse = await response.json()
            navigate('/profile', { state: { from: parsedResponse[0].username } })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="hidden lg:flex lg:w-1/4 ml-2 h-full default-font ">
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
                {/* <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                    <BsFillBellFill className="text-4xl" />
                    <p className="text-xl">Notifications (coming soon)</p>
                </div> */}
                {/* <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                    <BsEnvelopeFill className="text-4xl" />
                    <p className="text-xl">Messages (coming soon)</p>
                </div> */}
                <Link to={'/bookmarks'} state={{ from: 'user' }}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                        <IoBookmarks className="text-4xl" />
                        <p className="text-xl">Bookmarks</p>
                    </div>
                </Link>
                {/* <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                    <GiBookCover className="text-4xl" />
                    <p className="text-xl">Clubs (coming soon)</p>
                </div> */}
                <button onClick={() => api()}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                        <BsPersonCircle className="text-4xl" />
                        <p className="text-xl">Profile</p>
                    </div>
                </button>
                <Link to={'/settings'}>
                    <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                        <IoSettingsSharp className="text-4xl" />
                        <p className="text-xl">Settings</p>
                    </div>
                </Link>
                <div className="flex items-center gap-2 hover:bg-book-green-hover/30 p-2 rounded-full hover:text-book-dark/90">
                    <IoCodeWorking className="text-xl" />
                    <a href="https://cadencehiggins.notion.site/Book-Nest-Release-Notes-104e758b497780c2b45bd03cf7ec486b" target="_blank">Release Notes</a>
                </div>
            </div>
        </div >
    )
}