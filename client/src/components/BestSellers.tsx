import { useEffect, useState } from "react"
import { NytBooks } from "../types"
import { Link } from "react-router-dom"
export default function BestSellers() {
    const [response, setResponse] = useState<NytBooks>()
    useEffect(() => {
        fetch(`http://localhost:3000/nytApi`)
            .then(res => res.json())
            .then(data => setResponse(data))
            .catch((err) => console.error(err))
    }, [])


    return (
        <div className="flex flex-col justify-center w-full gap-3 h-full overflow-auto">
            <p className="text-center text-xl text-book-dark">NYT Best Sellers This Week </p>
            <div className="flex flex-col overflow-auto gap-2">
                {response && response.apiData.results.books.map((content, index) => {
                    return <div key={index} className="flex flex-col gap-2 justify-center">
                        <div className="flex items-center gap-2">
                            <Link to={'/bookInfo'} state={{ from: 'sellers', data: { content: content } }}><img src={content.book_image} alt={content.title} className="w-16" /></Link>
                            <div >
                                <Link to={'/bookInfo'} state={{ from: 'sellers', data: { content: content } }}><p>{content.title}</p></Link>
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