import { useState } from "react"
import BestSellers from "../components/BestSellers"
import Header from "../components/Header"
import MobileHeader from "../components/MobileHeader"
import SearchBar from "../components/SearchBar"
export default function Homepage() {
    const [sidebar, setSidebar] = useState('hidden')

    function toggleSidebar(val: boolean) {
        if (val === true) {
            setSidebar("absolute w-1/2 h-svh bg-book-green w3-animate-left ")
        }
        if (val === false) {
            setSidebar('hidden')
        }
    }


    return (
        <div>
            <div className={sidebar}>
                test
            </div>
            <MobileHeader toggleSidebar={toggleSidebar} />
            <div onClick={() => toggleSidebar(false)} className=" flex flex-col  md:flex-row m-2 h-svh">
                <div className="md:w-1/4 hidden md:flex">
                    <BestSellers />
                </div>
                <div className="flex flex-col w-full">
                    <Header />
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}