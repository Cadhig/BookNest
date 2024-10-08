import { Link } from "react-router-dom"
import { BsThreeDotsVertical } from "react-icons/bs";

interface HeaderProps {
    setMobileMenu: (value: boolean) => void
}

export default function MobileHeader(props: HeaderProps) {

    return (
        <div className=" w-full lg:hidden centered">
            <BsThreeDotsVertical className="text-4xl absolute left-4" onClick={() => props.setMobileMenu(true)} />
            <Link to={'/homepage'}>
                <div className=" header-font w-full text-center text-4xl p-4 text-book-dark lg:hidden cursor-pointer">BookNest</div>
            </Link>
        </div>
    )
}