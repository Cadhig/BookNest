import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { Bookmarked } from "../types"

export default function BookList() {
    const location = useLocation()
    const { from } = location.state
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

    useEffect(() => {
        fetchData()
    }, [])

    console.log(apiData)
    return (
        <div>
            <div>
                {apiData && apiData[0].books.map((content: Bookmarked, index: number) => {
                    return <div key={index}>
                        <Link to={'/bookinfo'} state={{ data: content.bookIsbn, from: 'bookmarks' }}>
                            <img src={content.bookImage} alt="" />
                            <p>{content.bookName}</p>
                        </Link>
                    </div>
                })}
            </div>
        </div>
    )
}