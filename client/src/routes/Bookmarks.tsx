import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Bookmarked } from "../types"

export default function BookList() {
    const navigate = useNavigate()
    const location = useLocation()
    const { from, data } = location.state
    const [apiData, setApiData] = useState<any>()

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
    }, [])

    console.log(apiData)
    return (
        <div>
            <div>
                {apiData && apiData[0].books.map((content: Bookmarked, index: number) => {
                    return <div key={index} onClick={() => viewBookInfo(content.bookIsbn)}>
                        <img src={content.bookImage} alt="" />
                        <p>{content.bookName}</p>
                    </div>
                })}
            </div>
        </div>
    )
}