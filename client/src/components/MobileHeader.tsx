import { Link } from "react-router-dom"

export default function MobileHeader() {

    return (
        <Link to={'/homepage'}>
            <div className=" header-font w-full text-center text-4xl p-4 text-book-dark lg:hidden cursor-pointer">BookNest</div>
        </Link>
    )
}