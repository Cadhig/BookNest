import { Link } from "react-router-dom"
import { BsThreeDotsVertical } from "react-icons/bs";
interface HeaderProps {
    toggleMobileMenu: (value: boolean) => void
}
export default function MobileHeader(props: HeaderProps) {

    return (
        <div className="w-full flex lg:hidden items-center ">
            <BsThreeDotsVertical className="text-2xl w-1/4" onClick={() => props.toggleMobileMenu(true)} />
            <Link to={'/homepage'}>
                <div className=" header-font l text-center text-4xl p-4 text-book-dark lg:hidden cursor-pointer">BookNest</div>
            </Link>
        </div>
    )
}