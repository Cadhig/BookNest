import { useEffect, useState } from "react"

export default function Homepage() {
    const [apiData, setApiData] = useState()
    useEffect(() => {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`)
            .then(res => res.json())
            .then(data => setApiData(data))
    }, [])
    console.log(apiData)
    return (
        <div>
            homepage
        </div>
    )
}