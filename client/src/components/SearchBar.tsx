import { useState } from "react"
import { Link } from "react-router-dom"
export default function SearchBar() {
    const [book, setBook] = useState<string>()

    return (
        <div className="w-full md:w-1/4">
            <div className="flex gap-2 w-full justify-center">
                <input type="text" placeholder='e.g "Colleen Hoover"' className="border border-book-sage w-3/4 md:w-1/2 flex-shrink-0 rounded-full p-2" onChange={(e) => setBook(e.target.value)} />
                <Link to={'/results'} state={{ from: { book } }}><button className="bg-book-green text-book-light py-2 px-4 rounded-full">Search</button></Link>
            </div>
        </div>
    )
}