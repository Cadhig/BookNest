import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { GoogleBooks } from "../types"
import Header from "../components/Header"
import MobileHeader from "../components/MobileHeader"
import Sidebar from "../components/Sidebar"
import BestSellers from "../components/BestSellers"
export default function SearchResults() {
    const location = useLocation()
    const { from } = location.state
    const [apiData, setApiData] = useState<GoogleBooks>()
    const [sidebar, setSidebar] = useState('hidden')

    const book = from.book.replace(/ /g, '').toLowerCase()

    console.log(book)
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(data => setApiData(data))
            .catch((err) => console.error(err))
    }, [])


    function toggleSidebar(val: boolean) {
        if (val) {
            setSidebar("sidebarStyles w3-animate-left")
        } else {
            setSidebar('hidden')
        }
    }

    return (
        <div className="default-font m-2 flex flex-col items-center">
            <Sidebar sidebar={sidebar} />
            <Header />
            <MobileHeader toggleSidebar={toggleSidebar} />
            <div className="text-center text-2xl">
                <p>Results for '{from.book}'</p>
            </div>
            <div className="flex flex-col md:w-1/2">
                {apiData && apiData.items.map((content, index) => {
                    return <div key={index} className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 py-4 pl-2">
                            <img src={content.volumeInfo.imageLinks?.thumbnail} alt={content.volumeInfo.title} className="h-28 md:h-full" />
                            <div>
                                <p>{content.volumeInfo.title}</p>
                                <p>{content.volumeInfo.authors}</p>
                            </div>
                        </div>
                        <div className="w-full h-1 bg-book-sage"></div>
                    </div>
                })}
            </div>
        </div>
    )
}