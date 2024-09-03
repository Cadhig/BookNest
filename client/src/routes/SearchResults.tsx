import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { GoogleBooks } from "../types"
import MobileHeader from "../components/MobileHeader"
import MobileMenu from "../components/MobileMenu"
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
export default function SearchResults() {
    const location = useLocation()
    const { search } = location.state
    const [apiData, setApiData] = useState<GoogleBooks>()
    const [mobileMenu, setMobileMenu] = useState('hidden')

    const book = search.book.replace(/ /g, '').toLowerCase()


    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(data => setApiData(data))
            .catch((err) => console.error(err))
    }, [search])

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
            <div className="flex flex-col-reverse md:flex-row">
                <Sidebar />
                <div className="default-font w-full md:w-1/2 flex flex-col items-center mt-4 h-1/4" onClick={() => toggleMobileMenu(false)}>
                    <div className="text-center text-2xl">
                        <p>Results for '{search.book}'</p>
                    </div>
                    <div className="flex flex-col w-full md:w-full">
                        {apiData && apiData.items.map((content, index) => {
                            return <div key={index} className="flex flex-col justify-center">
                                <div className="flex items-center gap-2 py-4 pl-2">
                                    <Link to={'/bookInfo'} state={{ from: 'search', data: content.volumeInfo }}> <img src={content.volumeInfo.imageLinks?.thumbnail} alt={content.volumeInfo.title} className="h-28 md:h-full" /></Link>
                                    <div>
                                        <Link to={'/bookInfo'} state={{ from: 'search', data: content.volumeInfo }}><p>{content.volumeInfo.title}</p></Link>
                                        <p>{content.volumeInfo.authors}</p>
                                    </div>
                                </div>
                                <div className="w-full h-1 bg-book-sage"></div>
                            </div>
                        })}
                    </div>
                </div>
                <SearchBar />
            </div>
        </div>
    )
}