import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { GoogleBooks } from "../types"
import Header from "../components/Header"
import MobileHeader from "../components/MobileHeader"
import Sidebar from "../components/Sidebar"
import { Link } from "react-router-dom"
export default function SearchResults() {
    const location = useLocation()
    const { from } = location.state
    const [apiData, setApiData] = useState<GoogleBooks>()
    const [sidebar, setSidebar] = useState('hidden')

    const book = from.book.replace(/ /g, '').toLowerCase()


    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(data => setApiData(data))
            .catch((err) => console.error(err))
    }, [])

    console.log(apiData)

    function toggleSidebar(val: boolean) {
        if (val) {
            setSidebar("sidebarStyles w3-animate-left")
        } else {
            setSidebar('hidden')
        }
    }

    return (
        <div>
            <Sidebar sidebar={sidebar} />
            <Header />
            <MobileHeader toggleSidebar={toggleSidebar} />
            <div className="default-font m-2 flex flex-col items-center " onClick={() => toggleSidebar(false)}>
                <div className="text-center text-2xl">
                    <p>Results for '{from.book}'</p>
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                    {apiData && apiData.items.map((content, index) => {
                        return <div key={index} className="flex flex-col justify-center">
                            <div className="flex items-center gap-2 py-4 pl-2">
                                <Link to={'/bookInfo'} state={{ from: 'search', data: { content: content.volumeInfo } }}> <img src={content.volumeInfo.imageLinks?.thumbnail} alt={content.volumeInfo.title} className="h-28 md:h-full" /></Link>
                                <div>
                                    <Link to={'/bookInfo'} state={{ from: 'search', data: { content: content.volumeInfo } }}><p>{content.volumeInfo.title}</p></Link>
                                    <p>{content.volumeInfo.authors}</p>
                                </div>
                            </div>
                            <div className="w-full h-1 bg-book-sage"></div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}