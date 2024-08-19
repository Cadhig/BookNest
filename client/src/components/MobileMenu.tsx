import { BsPersonCircle, BsFillHouseFill, BsFillBellFill, BsEnvelopeFill } from "react-icons/bs";
import { IoBookmarks, IoSettingsSharp } from "react-icons/io5";
import { GiBookCover } from "react-icons/gi";
import { Link } from "react-router-dom";
interface MobileMenuProps {
    mobileMenu: string
}
export default function MobileMenu(props: MobileMenuProps) {


    return (
        <div className={props.mobileMenu}>
            <div className="h-full m-4">
                <div className="flex flex-col gap-10">
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
                    <div className="flex items-center gap-2">
                        <IoBookmarks className="text-4xl" />
                        <p className="text-xl">Bookmarks</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <GiBookCover className="text-4xl" />
                        <p className="text-xl">Clubs</p>
                    </div>
                    <Link to={'/profile'} state={{ from: 'user' }}>
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