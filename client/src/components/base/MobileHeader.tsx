import { Link } from "react-router-dom"


export default function MobileHeader() {

    return (
        <div className="w-full lg:hidden z-50 centered">
            <Link to={'/homepage'}>
                <div className=" header-font w-full text-center text-4xl p-4 lg:hidden cursor-pointer">BookNest</div>
            </Link>
        </div>
    )
}