import { useState } from "react";
import BestSellers from "../components/BestSellers";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import Sidebar from "../components/Sidebar";

export default function BestSellersMobile() {
    const [sidebar, setSidebar] = useState('hidden')

    function toggleSidebar(val: boolean) {
        if (val) {
            setSidebar("absolute w-1/2 h-svh bg-book-sage w3-animate-left")
        } else {
            setSidebar('hidden')
        }
    }


    return (
        <div>
            <Sidebar sidebar={sidebar} />
            <Header />
            <MobileHeader toggleSidebar={toggleSidebar} />
            <BestSellers />
        </div>
    )
}