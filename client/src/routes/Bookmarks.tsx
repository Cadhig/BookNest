import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Bookmarked } from "../types"
import MobileHeader from "../components/MobileHeader"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import MobileMenu from "../components/MobileMenu"
import SearchBar from "../components/SearchBar"

export default function BookList() {
    const navigate = useNavigate()
    const location = useLocation()
    const { from } = location.state
    const [apiData, setApiData] = useState<any>()
    const [mobileMenu, setMobileMenu] = useState<string>('hidden')
    const [noBookmarks, setNoBookmarks] = useState<string>('hidden')

    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("mobileMenuStyles w3-animate-left")
        } else {
            setMobileMenu('hidden')
        }
    }

    async function fetchData() {
        const data = {
            username: from
        }
        await fetch(`http://localhost:3000/api/user/bookmarks`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then(async (res) => {
                if (res.ok) {
                    const jsonData = await res.json()
                    setApiData(jsonData)
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }

    async function viewBookInfo(isbn: string) {
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                if (res.ok) {
                    const jsonData = await res.json()
                    console.log(jsonData)
                    navigate('/bookInfo', { state: { data: jsonData.items[0].volumeInfo } })
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        fetchData()
        if (apiData && apiData[0].books.length < 1) {
            setNoBookmarks('w-full text-center mt-2')
        }
    }, [])

    console.log(apiData)
    return (
        <div className="h-svh default-font text-book-dark">
            <MobileMenu mobileMenu={mobileMenu} />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <Header />
            <div className="flex flex-col-reverse gap-2 md:flex-row">
                <Sidebar />
                <div className="w-full md:w-1/2">
                    <p className="text-center text-xl">{apiData && apiData[0].username}'s Saved Books</p>
                    <div className={noBookmarks}>
                        <p className="inline text-black/50 text-xl">No saved books yet!</p>
                    </div>
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 m-2" onClick={() => toggleMobileMenu(false)}>
                        {apiData && apiData[0].books.map((content: Bookmarked, index: number) => {
                            return <div key={index} onClick={() => viewBookInfo(content.bookIsbn)}>
                                <img src={content.bookImage} alt="" />
                                <p>{content.bookName}</p>
                            </div>
                        })}
                    </div>
                </div>
                <SearchBar />
            </div>
        </div>
    )
}