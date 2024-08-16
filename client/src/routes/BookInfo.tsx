import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { ImAmazon } from "react-icons/im"
import MobileHeader from "../components/MobileHeader"
import Reviews from "../components/Reviews"
import MobileMenu from "../components/MobileMenu"
import { GoogleBooks } from "../types"
import SearchBar from "../components/SearchBar"
import Sidebar from "../components/Sidebar"

export default function BookInfo() {
    const location = useLocation()
    const { data } = location.state
    const [mobileMenu, setMobileMenu] = useState('hidden')
    const [apiData, setApiData] = useState<GoogleBooks>()
    const squishedTitle = data.content.title.replace(/ /g, '').toLowerCase()
    const [bookTitle, setBookTitle] = useState(squishedTitle)
    const isbnData = data.content.industryIdentifiers[0].identifier
    console.log(isbnData)
    const [isbn, setIsbn] = useState(isbnData)


    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("mobileMenuStyles w3-animate-left")
        } else {
            setMobileMenu('hidden')
        }
    }

    useEffect(() => {
        setBookTitle(squishedTitle)
        setIsbn(isbnData)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}+isbn:${isbn}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(response => setApiData(response))
            .catch((err) => console.error(err))
    }, [bookTitle, data])

    const amazonLink = `https://www.amazon.com/s?k=${apiData && apiData.items[0].volumeInfo.industryIdentifiers[0].identifier}&i=stripbooks&linkCode=qs`
    return (
        <div>
            <MobileMenu mobileMenu={mobileMenu} />
            <Header />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div className="flex justify-center" onClick={() => toggleMobileMenu(false)}>
                <Sidebar />
                <div className="default-font md:w-1/2 m-2 flex flex-col items-center">
                    <div className="flex flex-col gap-2 md:gap-4 md:w-full items-center md:border md:border-book-green md:p-5">
                        <div className="flex gap-2">
                            <img src={apiData && apiData.items[0].volumeInfo.imageLinks?.thumbnail} alt={apiData && apiData.items[0].volumeInfo.title} className="w-32 h-64 md:w-64" />
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
                <SearchBar />
            </div >
        </div>
    )
}