import { useState } from "react"
import MobileHeader from "../components/MobileHeader"
import SearchBar from "../components/SearchBar"
import MobileMenu from "../components/MobileMenu"
import CreatePost from "../components/CreatePost"
import Sidebar from "../components/Sidebar"
import Posts from "../components/Posts"

export default function Homepage() {
    const [mobileMenu, setMobileMenu] = useState('hidden')
    const [refreshFeed, setRefreshFeed] = useState(false)

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
            <div onClick={() => toggleMobileMenu(false)} className="flex flex-col md:flex-row-reverse">
                <SearchBar />
                <div className="flex flex-col md:w-1/2 w-full max-h-full">
                    <CreatePost setRefreshFeed={setRefreshFeed} refreshFeed={refreshFeed} />
                    <Posts refreshFeed={refreshFeed} />
                </div>
                <Sidebar />
            </div>
        </div>
    )
}