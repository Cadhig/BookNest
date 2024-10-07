import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { GoogleBooks } from "../types"
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import MobileHeader from "../components/base/MobileHeader"
import CreateReview from "../components/bookInfo/CreateReview"
import MobileMenu from "../components/base/MobileMenu"
import Reviews from "../components/Reviews"
import RightSidebar from "../components/base/RightSidebar"
import Sidebar from "../components/base/Sidebar"
import BookImageColumn from "../components/bookInfo/BookImageColumn"
import BookInformation from "../components/bookInfo/BookInformation"

export default function BookInfo() {
    const location = useLocation()
    const { data, isFromSearchResults } = location.state
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
    const [bookData, setBookData] = useState<GoogleBooks | undefined>()
    const [bookmarkStatus, setBookmarkStatus] = useState<boolean>(true)
    const [bookmark, setBookmark] = useState(<IoBookmarkOutline />)
    const [showGooglePlay, setShowGooglePlay] = useState<boolean>(true)
    const [refreshFeed, setRefreshFeed] = useState<boolean>(false)

    useEffect(() => {
        console.log(data)
        fetchBook()
    }, [data])

    async function fetchBook() {
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isFromSearchResults ? data.industryIdentifiers[0].identifier : data}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
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
                        }
                    })
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))
    }

    function switchBookmarkStatus() {
        if (bookmarkStatus) {
            setBookmark(<IoBookmark />)
            addBook()
            setBookmarkStatus(false)

        } else {
            setBookmark(<IoBookmarkOutline />)
            removeBook()
            setBookmarkStatus(true)
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



    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={showMobileMenu ? "mobileMenuStyles w3-animate-left" : "hidden"} />
            <MobileHeader setMobileMenu={setShowMobileMenu} />
            <div className="flex flex-col-reverse lg:flex-row justify-center gap-4" onClick={() => setShowMobileMenu(false)}>
                <Sidebar />
                <div className="default-font lg:w-1/2 m-2 flex flex-col items-center max-h-svh hideScrollbar overflow-auto">
                    <div className="flex flex-col gap-4 w-full items-center mt-4 ">
                        <div className="flex flex-col gap-4 w-full lg:flex-row">
                            <BookImageColumn bookData={bookData} bookmark={bookmark} switchBookmarkStatus={switchBookmarkStatus} showGooglePlay={showGooglePlay} />
                            <BookInformation bookData={bookData} />
                        </div>
                        <CreateReview bookData={bookData} setRefreshFeed={setRefreshFeed} refreshFeed={refreshFeed} />
                        <div className="w-full">
                            <Reviews bookIsbn={isFromSearchResults ? data.industryIdentifiers[0].identifier : data} refreshFeed={refreshFeed} isFromBookInfoPage={true} />
                        </div>
                    </div>
                </div>
                <RightSidebar />
            </div >
        </div>
    )
}