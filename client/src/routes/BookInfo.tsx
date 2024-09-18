import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { ImAmazon } from "react-icons/im"
import MobileHeader from "../components/MobileHeader"
import Reviews from "../components/Reviews"
import MobileMenu from "../components/MobileMenu"
import { GoogleBooks } from "../types"
import RightSidebar from "../components/RightSidebar"
import Sidebar from "../components/Sidebar"
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { FaGooglePlay } from "react-icons/fa";


export default function BookInfo() {
    const location = useLocation()
    const { data } = location.state
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
    const [bookData, setBookData] = useState<GoogleBooks>()
    const isbnData = data.industryIdentifiers[0].identifier
    const [isbn, setIsbn] = useState(isbnData)
    const [bookmarkStatus, setBookmarkStatus] = useState<boolean>(true)
    const [bookmark, setBookmark] = useState(<IoBookmarkOutline />)
    const [showGooglePlay, setShowGooglePlay] = useState<boolean>(true)
    const [showPreview, setShowPreview] = useState<boolean>(true)

    useEffect(() => {
        setIsbn(isbnData)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(bookResponse => {
                setBookData(bookResponse)
                fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/loggedInUser`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                })
                    .then(res => res.json())
                    .then(userResponse => {
                        if (userResponse) {
                            const AllBooks = userResponse[0].books
                            for (let currentBook = 0; currentBook < AllBooks.length; currentBook++) {
                                const CurrentBookmarkedIsbn = AllBooks[currentBook].bookIsbn
                                const DisplayedBookIsbn = bookResponse.items[0].volumeInfo.industryIdentifiers[0].identifier
                                if (CurrentBookmarkedIsbn === DisplayedBookIsbn) {
                                    setBookmarkStatus(false)
                                    setBookmark(<IoBookmark />)
                                }
                            }
                            if (bookResponse?.items[0].saleInfo.buyLink === undefined) {
                                setShowGooglePlay(false)
                            }
                            if (bookResponse?.items[0].accessInfo.webReaderLink === undefined) {
                                setShowPreview(false)
                            }
                        }
                    })
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))
    }, [data])
    console.log(bookData)
    function switchBookmarkStatus() {
        if (bookmarkStatus) {
            setBookmark(<IoBookmark />)
            addBook()

        } else {
            setBookmark(<IoBookmarkOutline />)
            removeBook()
        }
    }

    async function addBook() {
        const data = {
            bookName: bookData && bookData.items[0].volumeInfo.title,
            bookIsbn: bookData && bookData.items[0].volumeInfo.industryIdentifiers[0].identifier,
            bookImage: bookData && bookData.items[0].volumeInfo.imageLinks?.thumbnail
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/books/saved`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    async function removeBook() {
        const data = {
            bookIsbn: bookData && bookData.items[0].volumeInfo.industryIdentifiers[0].identifier
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/books/unsave`, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.error(err)
            })
    }


    const amazonLink = `https://www.amazon.com/s?k=${bookData && bookData.items[0].volumeInfo.industryIdentifiers[0].identifier}&i=stripbooks&linkCode=qs`
    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={showMobileMenu ? "mobileMenuStyles w3-animate-left" : "hidden"} />
            <MobileHeader setMobileMenu={setShowMobileMenu} />
            <div className="flex flex-col-reverse lg:flex-row justify-center gap-4" onClick={() => setShowMobileMenu(false)}>
                <Sidebar />
                <div className="default-font lg:w-1/2 m-2 flex flex-col items-center">
                    <div className="flex flex-col gap-4 lg:w-full items-center mt-4">
                        <div className="flex flex-col  items-center  gap-4">
                            <div className="flex w-full justify-center gap-1 ">
                                <p className="text-center text-2xl font-bold ">{bookData && bookData.items[0].volumeInfo.title}</p>
                                <p className="text-3xl text-end" onClick={() => switchBookmarkStatus()}>{bookmark}</p>
                            </div>
                            <img src={bookData && bookData.items[0].volumeInfo.imageLinks?.thumbnail} alt={bookData && bookData.items[0].volumeInfo.title} className="size-1/2 md:h-60 md:w-32 lg:h-96 lg:w-60" />
                            <div className="flex flex-col gap-2 text-center items-center justify-between">
                                <div className="h-20 overflow-auto">
                                    <p>{bookData && bookData.items[0].volumeInfo.description}</p>
                                </div>
                                <div>
                                    <a className={showPreview ? 'block text-xl text-blue-500 hover:underline' : 'hidden'} target="_blank" href={bookData && bookData.items[0].accessInfo.webReaderLink}>Preview</a>
                                </div>
                                <div>
                                    <p>Categories: {bookData && bookData.items[0].volumeInfo.categories}</p>
                                </div>
                                <div>
                                </div>
                                <div className="flex justify-center gap-6">
                                    <a href={amazonLink} target="_blank" className="text-3xl"><ImAmazon /></a>
                                    <a target="_blank" className={showGooglePlay ? "block text-2xl" : "hidden"} href={bookData && bookData?.items[0].saleInfo.buyLink}><FaGooglePlay /></a>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 text-center">
                            <div>
                                <p>Publisher</p>
                                <p>{bookData && bookData.items[0].volumeInfo.publisher}</p>
                            </div>
                            <div className="h-14 bg-black w-[1px]"></div>
                            <div>
                                <p>Author</p>
                                <p>{bookData && bookData.items[0].volumeInfo.authors[0]}</p>
                            </div>
                        </div>
                        <p>Published on {bookData && bookData.items[0].volumeInfo.publishedDate}</p>
                        <Reviews />
                    </div>
                </div>
                <RightSidebar />
            </div >
        </div>
    )
}