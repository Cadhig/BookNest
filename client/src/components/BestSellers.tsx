import { useEffect, useState } from "react"
import { NytBooks } from "../types"
import { Link } from "react-router-dom"
export default function BestSellers() {
    const [apiData, setApiData] = useState<NytBooks>()
    useEffect(() => {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`)
            .then(res => res.json())
            .then(data => setApiData(data))
            .catch((err) => console.error(err))
    }, [])
    console.log(apiData)

    return (
        <div className="flex flex-col justify-center w-full gap-3 h-full overflow-auto">
            <p className="text-center text-xl text-book-dark">NYT Best Sellers This Week </p>
            <div className="flex flex-col overflow-auto gap-2">
                {apiData && apiData.results.books.map((content, index) => {
                    return <div key={index} className="flex flex-col gap-2 justify-center">
                        <div className="flex items-center gap-2">
                            <Link to={'/bookInfo'} state={{ from: { content } }}><img src={content.book_image} alt={content.title} className="w-16" /></Link>
                            <div >
                                <Link to={'/bookInfo'} state={{ from: { content } }}><p>{content.title}</p></Link>
                                {/* create link to author info */}
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