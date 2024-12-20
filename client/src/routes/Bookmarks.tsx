import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Bookmarked, User } from "../types"
import MobileHeader from "../components/base/MobileHeader"
import Sidebar from "../components/base/Sidebar"
import MobileMenu from "../components/base/MobileMenu"
import RightSidebar from "../components/base/RightSidebar"

export default function BookList() {
    const navigate = useNavigate()
    const location = useLocation()
    const { from } = location.state
    const [apiData, setApiData] = useState<User[] | undefined>()
    const [noBookmarks, setNoBookmarks] = useState<boolean>(false)
    const [user, setUser] = useState<string>()


    async function fetchData() {
        const data = {
            username: from
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/bookmarks`, {
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
                    if (from === 'user') {
                        setUser('Your Bookmarks')
                        if (jsonData && jsonData[0].books.length < 1) {
                            setNoBookmarks(true)
                        }
                    } else {
                        setUser(jsonData[0].username + "'s Bookmarks")
                        if (jsonData && jsonData[0].books.length < 1) {
                            setNoBookmarks(true)
                        }
                    }
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
                    navigate(`/book/${jsonData.items[0].volumeInfo.industryIdentifiers[0].identifier}`, { state: { data: jsonData.items[0].volumeInfo.industryIdentifiers[0].identifier } })
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        fetchData()
    }, [from])

    return (
        <div className="h-svh default-font">
            <MobileMenu />
            <div className="flex flex-col-reverse lg:flex-row lg:h-full gap-4 overflow-hidden">
                <Sidebar />
                <div className="w-full lg:w-1/2 mt-4">
                    <p className="text-center text-3xl font-bold">{user}</p>
                    <div className={noBookmarks ? 'inline w-full text-center' : 'hidden'}>
                        <p className="text-black/50 text-center text-xl mt-4 lg:mt-4">No saved books yet!</p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-2 m-2">
                        {apiData && apiData[0].books.map((content: Bookmarked, index: number) => {
                            return <div key={index} onClick={() => viewBookInfo(content.bookIsbn)} className="flex flex-col items-center gap-2 hoverFloat hover:underline">
                                <img src={content.bookImage} alt="" />
                                <p className="text-xl text-center overflow-hidden text-ellipsis whitespace-nowrap w-full">{content.bookName}</p>
                            </div>
                        })}
                    </div>
                </div>
                <RightSidebar />
                <MobileHeader />
            </div>
        </div>
    )
}