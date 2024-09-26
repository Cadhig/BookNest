import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { ImAmazon } from "react-icons/im"
import MobileHeader from "../components/MobileHeader"
import CreateReview from "../components/CreateReview"
import MobileMenu from "../components/MobileMenu"
import { GoogleBooks } from "../types"
import RightSidebar from "../components/RightSidebar"
import Sidebar from "../components/Sidebar"
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { FaGooglePlay } from "react-icons/fa";
import Reviews from "../components/Reviews"


export default function BookInfo() {
    const location = useLocation()
    const { data } = location.state
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
    const [bookData, setBookData] = useState<GoogleBooks | undefined>()
    const isbnData = data.industryIdentifiers[0].identifier
    const [isbn, setIsbn] = useState(isbnData)
    const [bookmarkStatus, setBookmarkStatus] = useState<boolean>(true)
    const [bookmark, setBookmark] = useState(<IoBookmarkOutline />)
    const [showGooglePlay, setShowGooglePlay] = useState<boolean>(true)
    const [refreshFeed, setRefreshFeed] = useState<boolean>(false)

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
                        }
                    })
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))
    }, [data])

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

    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={showMobileMenu ? "mobileMenuStyles w3-animate-left" : "hidden"} />
            <MobileHeader setMobileMenu={setShowMobileMenu} />
            <div className="flex flex-col-reverse lg:flex-row justify-center gap-4" onClick={() => setShowMobileMenu(false)}>
                <Sidebar />
                <div className="default-font lg:w-1/2 m-2 flex flex-col items-center max-h-svh hideScrollbar overflow-auto">
                    <div className="flex flex-col gap-4 lg:w-full items-center mt-4">
                        <div className="flex flex-col gap-4">
                            <BookTitle bookData={bookData} switchBookmarkStatus={switchBookmarkStatus} bookmark={bookmark} />
                            <BookImageAndDescription bookData={bookData} />
                            <BookLinksAndActions bookData={bookData} switchBookmarkStatus={switchBookmarkStatus} showGooglePlay={showGooglePlay} bookmark={bookmark} />
                        </div>
                        <PublisherAndAuthor bookData={bookData} />
                        <CreateReview bookData={bookData} setRefreshFeed={setRefreshFeed} refreshFeed={refreshFeed} />
                        <Reviews bookIsbn={isbn} refreshFeed={refreshFeed} />
                    </div>
                </div>
                <RightSidebar />
            </div >
        </div>
    )
}

interface bookInfoChildren {
    bookData: GoogleBooks | undefined,
    switchBookmarkStatus?: () => void,
    bookmark?: React.ReactNode,
    showGooglePlay?: boolean
}

function BookTitle(props: bookInfoChildren) {

    return (
        <div className="flex w-full justify-center gap-1 ">
            <p className="text-center text-2xl font-bold ">{props.bookData && props.bookData.items[0].volumeInfo.title}</p>
            <p className="text-3xl text-end lg:hidden" onClick={() => props.switchBookmarkStatus?.()}>{props.bookmark}</p>
        </div>
    )
}

function BookImageAndDescription(props: bookInfoChildren) {

    return (
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
            <img src={props.bookData && props.bookData.items[0].volumeInfo.imageLinks?.thumbnail} alt={props.bookData && props.bookData.items[0].volumeInfo.title} className="size-1/2 md:size-1/4 lg:h-96 lg:w-60" />
            <div className="h-36 lg:h-96 overflow-auto">
                <p>{props.bookData && props.bookData.items[0].volumeInfo.description}</p>
            </div>
        </div>
    )
}

function BookLinksAndActions(props: bookInfoChildren) {

    const amazonLink = `https://www.amazon.com/s?k=${props.bookData && props.bookData.items[0].volumeInfo.industryIdentifiers[0].identifier}&i=stripbooks&linkCode=qs`

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-between px-4 gap-4">
                <div className="hidden lg:flex text-xl gap-2">
                    <p>Bookmark</p>
                    <p className="text-3xl" onClick={() => props.switchBookmarkStatus?.()}>{props.bookmark}</p>
                </div>
                <div className="flex gap-6">
                    <a href={amazonLink} target="_blank" className="text-3xl"><ImAmazon /></a>
                    <a target="_blank" className={props.showGooglePlay ? "block text-2xl" : "hidden"} href={props.bookData && props.bookData?.items[0].saleInfo.buyLink}><FaGooglePlay /></a>
                </div>
            </div>
        </div>
    )
}

function PublisherAndAuthor(props: bookInfoChildren) {

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <p>Categories: {props.bookData && props.bookData.items[0].volumeInfo.categories}</p>
            <div className="flex w-full justify-center gap-4 text-center">
                <div>
                    <p>Publisher</p>
                    <p>{props.bookData && props.bookData.items[0].volumeInfo.publisher}</p>
                </div>
                <div className="h-14 bg-black w-[1px]"></div>
                <div>
                    <p>Author</p>
                    <p>{props.bookData && props.bookData.items[0].volumeInfo.authors[0]}</p>
                </div>
            </div>
            <p>Published on {props.bookData && props.bookData.items[0].volumeInfo.publishedDate}</p>
        </div>
    )
}