import { Link } from "react-router-dom"

export default function Header() {

    return (
        <Link to={'/homepage'}>
            <div className=" header-font w-full text-center top-0 text-4xl p-4 text-book-dark hidden lg:block">BookNest</div>
        </Link>
    )
}