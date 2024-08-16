import { useState } from "react"
import Header from "../components/Header"
import MobileHeader from "../components/MobileHeader"
import SearchBar from "../components/SearchBar"
import MobileMenu from "../components/MobileMenu"
import CreatePost from "../components/CreatePost"
import Sidebar from "../components/Sidebar"

export default function Homepage() {
    const [mobileMenu, setMobileMenu] = useState('hidden')

    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("mobileMenuStyles w3-animate-left")
        } else {
            setMobileMenu('hidden')
        }
    }


    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={mobileMenu} />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <Header />
            <div onClick={() => toggleMobileMenu(false)} className="flex flex-col md:flex-row-reverse m-2 h-full">
                <SearchBar />
                <div className="flex flex-col w-1/2">
                    <div className="md:border-x md:border-x-book-green h-svh md:w-full">
                        <CreatePost />
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}