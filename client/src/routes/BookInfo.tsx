import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { ImAmazon, ImAppleinc } from "react-icons/im"
import MobileHeader from "../components/MobileHeader"
import BestSellers from "../components/BestSellers"
import Reviews from "../components/Reviews"
import Clubs from "../components/Clubs"
import Sidebar from "../components/Sidebar"
import { GoogleBooks } from "../types"

export default function BookInfo() {
    const location = useLocation()
    const { from } = location.state
    const [sidebar, setSidebar] = useState('hidden')
    const [apiData, setApiData] = useState<GoogleBooks>()

    function toggleSidebar(val: boolean) {
        if (val) {
            setSidebar("sidebarStyles w3-animate-left")
        } else {
            setSidebar('hidden')
        }
    }

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${from.content.title}+isbn:${from.content.primary_isbn13
            }&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(data => setApiData(data))
            .catch((err) => console.error(err))
    }, [])

    console.log(apiData)

    const amazonLink = `https://www.amazon.com/s?k=${apiData && apiData.items[0].volumeInfo.industryIdentifiers[0].identifier}&i=stripbooks&linkCode=qs`
    return (
        <div>
            <Sidebar sidebar={sidebar} />
            <Header />
            <MobileHeader toggleSidebar={toggleSidebar} />
            <div className="flex" onClick={() => toggleSidebar(false)}>
                <div className="hidden h-svh md:w-1/4 md:flex">
                    <BestSellers />
                </div>
                <div className="default-font md:w-1/2 m-2 flex flex-col items-center">
                    <div className="flex flex-col gap-2 md:gap-4 md:w-full  items-center md:border md:border-book-green md:p-5">
                        <div className="flex gap-2">
                            <img src={apiData && apiData.items[0].volumeInfo.imageLinks.thumbnail} alt={apiData && apiData.items[0].volumeInfo.title} className="w-32 h-64 md:w-64" />
                            <div className="flex flex-col gap-2 text-center items-center justify-between">
                                <p className="text-2xl">{apiData && apiData.items[0].volumeInfo.title}</p>
                                <div className="h-60 overflow-auto">
                                    <p>{apiData && apiData.items[0].volumeInfo.description}</p>
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <a href={amazonLink} target="_blank" className="text-3xl"><ImAmazon /></a>
                                    {/* <a href={from.content.buy_links[1].url} target="_blank" className="text-3xl"><ImAppleinc /></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 text-center">
                            <div>
                                <p>Publisher</p>
                                <p>{apiData && apiData.items[0].volumeInfo.publisher}</p>
                            </div>
                            <div className="h-14 bg-black w-[1px]"></div>
                            <div>
                                <p>Author</p>
                                <p>{apiData && apiData.items[0].volumeInfo.authors[0]}</p>
                            </div>
                        </div>
                        <Reviews />
                    </div>
                </div>
                <div className="hidden md:w-1/4 md:flex">
                    <Clubs />
                </div>
            </div >
        </div>
    )
}