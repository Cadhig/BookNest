import { useState } from "react"
import Header from "../components/Header"
import MobileHeader from "../components/MobileHeader"
import SearchBar from "../components/SearchBar"
import Sidebar from "../components/Sidebar"

export default function Homepage() {
    const [sidebar, setSidebar] = useState('hidden')

    function toggleSidebar(val: boolean) {
        if (val) {
            setSidebar("sidebarStyles w3-animate-left")
        } else {
            setSidebar('hidden')
        }
    }


    return (
        <div className="h-svh">
            <Sidebar sidebar={sidebar} />
            <MobileHeader toggleSidebar={toggleSidebar} />
            <div onClick={() => toggleSidebar(false)} className="flex flex-col md:flex-row m-2 h-full">
                <div className="flex flex-col w-full">
                    <Header />
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}