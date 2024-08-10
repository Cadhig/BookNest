import { useEffect, useState } from "react"
import { ApiResponse } from "../types"
export default function BestSellers() {
    const [apiData, setApiData] = useState<ApiResponse>()
    useEffect(() => {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`)
            .then(res => res.json())
            .then(data => setApiData(data))
            .catch((err) => console.error(err))
    }, [])
    console.log(apiData)

    return (
        <div className="flex flex-col justify-center md:w-1/4 w-full gap-3 h-1/2 overflow-auto m-2">
            <p className="text-center text-xl text-book-dark">NYT Best Sellers This Week </p>
            <div className="flex flex-col overflow-auto gap-2">
                {apiData && apiData.results.books.map((content, index) => {
                    return <div key={index} className="flex flex-col gap-2 justify-center">
                        <div className="flex items-center gap-2">
                            <img src={content.book_image} alt={content.title} className="w-16" />
                            <div >
                                <p>{content.title}</p>
                                <p>{content.author}</p>
                            </div>
                        </div>
                        <div className="w-full h-1 bg-book-sage"></div>
                    </div>
                })}
            </div>
        </div>
    )
}