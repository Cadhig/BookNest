import { Link } from "react-router-dom"
interface SidebarProps {
    sidebar: string
}
export default function Sidebar(props: SidebarProps) {


    return (
        <div className={props.sidebar}>
            <Link to={'/bestSellers'}>
                <div className=" m-2 p-2 text-center bg-book-green text-book-light ">
                    <p>NYT Bestsellers</p>
                </div>
            </Link>
        </div>
    )
}