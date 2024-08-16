import { Link } from "react-router-dom"
interface MobileMenuProps {
    mobileMenu: string
}
export default function MobileMenu(props: MobileMenuProps) {


    return (
        <div className={props.mobileMenu}>
            <Link to={'/bestSellers'}>
                <div className=" m-2 p-2 text-center bg-book-green text-book-light ">
                    <p>NYT Bestsellers</p>
                </div>
            </Link>
        </div>
    )
}