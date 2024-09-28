import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { GoogleBooks } from "../types"
import MobileHeader from "../components/MobileHeader"
import MobileMenu from "../components/MobileMenu"
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import RightSidebar from "../components/RightSidebar"
export default function SearchResults() {
    const location = useLocation()
    const { search } = location.state
    const [apiData, setApiData] = useState<GoogleBooks>()
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const book = search.book.replace(/ /g, '').toLowerCase()


    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                if (data.items[0].volumeInfo.industryIdentifiers[0].type === "OTHER") {
                    setError(true)
                } else {
                    setApiData(data)
                    setError(false)
                }
            })
            .catch((err) => console.error(err))
    }, [search])

    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={showMobileMenu ? "mobileMenuStyles w3-animate-left" : "hidden"} />
            <MobileHeader setMobileMenu={setShowMobileMenu} />
            <div className="flex flex-col-reverse lg:flex-row">
                <Sidebar />
                <div className="default-font w-full lg:w-1/2 flex flex-col items-center mt-4 h-1/4" onClick={() => setShowMobileMenu(false)}>
                    <div className="text-center text-3xl">
                        <p>Results for '{search.book}'</p>
                    </div>
                    {error ? "No results match search" : <div className="flex flex-col w-full lg:w-full">
                        {apiData && apiData.items.map((content, index) => {
                            return <div key={index} className="flex flex-col justify-center">
                                <div className="flex items-center gap-2 py-4 pl-2">
                                    <Link to={'/bookInfo'} state={{ isFromSearchResults: true, data: content.volumeInfo }}> <img src={content.volumeInfo.imageLinks?.thumbnail} alt={content.volumeInfo.title} className="h-28 lg:h-full" /></Link>
                                    <div>
                                        <Link to={'/bookInfo'} state={{ isFromSearchResults: true, data: content.volumeInfo }}><p className="font-bold text-xl">{content.volumeInfo.title}</p></Link>
                                        <p className="text-book-dark/60">{content.volumeInfo.authors}</p>
                                    </div>
                                </div>
                                <div className="w-full h-1 bg-book-sage"></div>
                            </div>
                        })}
                    </div>}
                </div>
                <RightSidebar />
            </div>
        </div>
    )
}