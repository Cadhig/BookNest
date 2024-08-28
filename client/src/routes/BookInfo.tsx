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
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

export default function BookInfo() {
    const location = useLocation()
    const { data } = location.state
    const [mobileMenu, setMobileMenu] = useState('hidden')
    const [bookData, setBookData] = useState<GoogleBooks>()
    const isbnData = data.industryIdentifiers[0].identifier
    const [isbn, setIsbn] = useState(isbnData)
    const [bookmarkStatus, setBookmarkStatus] = useState<boolean>(true)
    const [bookmark, setBookmark] = useState(<IoBookmarkOutline />)

    useEffect(() => {
        setIsbn(isbnData)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(bookResponse => {
                setBookData(bookResponse)
                fetch('http://localhost:3000/api/user/loggedInUser', {
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
                                    return
                                }

                            }
                        }
                    })
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))
    }, [data])

    function switchBookmarkStatus() {
        console.log(bookmarkStatus)
        if (bookmarkStatus === true) {
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
        await fetch('http://localhost:3000/api/books/saved', {
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
        await fetch('http://localhost:3000/api/books/unsave', {
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

    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("mobileMenuStyles w3-animate-left")
        } else {
            setMobileMenu('hidden')
        }
    }

    const amazonLink = `https://www.amazon.com/s?k=${bookData && bookData.items[0].volumeInfo.industryIdentifiers[0].identifier}&i=stripbooks&linkCode=qs`
    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={mobileMenu} />
            <Header />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div className="flex flex-col-reverse md:flex-row justify-center gap-4" onClick={() => toggleMobileMenu(false)}>
                <Sidebar />
                <div className="default-font md:w-1/2 m-2 flex flex-col items-center">
                    <div className="flex flex-col gap-4 md:w-full items-center md:border md:border-book-green md:p-5">
                        <div className="flex flex-col  items-center  gap-4">
                            <div className="flex w-full justify-center gap-1 ">
                                <p className="text-center text-2xl font-bold ">{bookData && bookData.items[0].volumeInfo.title}</p>
                                <p className="text-3xl text-end" onClick={() => switchBookmarkStatus()}>{bookmark}</p>
                            </div>
                            <img src={bookData && bookData.items[0].volumeInfo.imageLinks?.thumbnail} alt={bookData && bookData.items[0].volumeInfo.title} className="size-1/2 md:h-96 md:w-60" />
                            <div className="flex flex-col gap-2 text-center items-center justify-between">
                                <div className="h-60 overflow-auto">
                                    <p>{bookData && bookData.items[0].volumeInfo.description}</p>
                                </div>
                                <div className="flex justify-center">
                                    <a href={amazonLink} target="_blank" className="text-3xl"><ImAmazon /></a>
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
                        <Reviews />
                    </div>
                </div>
                <SearchBar />
            </div >
        </div>
    )
}