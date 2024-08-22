import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

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
            book list
        </div>
    )
}