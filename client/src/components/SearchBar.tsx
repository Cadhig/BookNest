import { useState } from "react"
import { Link } from "react-router-dom"
export default function SearchBar() {
    const [book, setBook] = useState<string>()

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex gap-2 w-full justify-center">
                <input type="text" placeholder='e.g "Colleen Hoover"' className="border border-book-sage w-3/4 md:w-1/2 flex-shrink-0 " onChange={(e) => setBook(e.target.value)} />
                <Link to={'/results'} state={{ from: { book } }}><button className="bg-book-green text-book-light p-2">Search</button></Link>
            </div>
        </div>
    )
}