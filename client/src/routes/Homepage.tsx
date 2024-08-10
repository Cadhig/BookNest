import { useEffect } from "react"

export default function Homepage() {
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${import.meta.env.VITE_API_KEY}`)
    }, [])
    return (
        <div>
            homepage
        </div>
    )
}