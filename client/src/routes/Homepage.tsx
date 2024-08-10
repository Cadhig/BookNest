import { useEffect, useState } from "react"
import { ApiResponse } from "../types"

export default function Homepage() {
    const [apiData, setApiData] = useState<ApiResponse>()
    useEffect(() => {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`)
            .then(res => res.json())
            .then(data => setApiData(data))
            .catch((err) => console.error(err))
    }, [])
    console.log(apiData)
    return (
        <div>
            {apiData && apiData.results.books.map((content, index) => {
                return <div key={index}>{content.title}</div>
            })}
        </div>
    )
}