import { useEffect, useState } from "react"
import { NytBooks } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import moment from "moment"

export default function RightSidebar() {
    const [book, setBook] = useState<string>()
    const [bestSellerList, setBestSellerList] = useState<NytBooks[] | undefined>()
    const navigate = useNavigate()

    useEffect(() => {
        retrieveBestSellerList()
    }, [])

    async function retrieveBestSellerList() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/books/bestSellerList`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const bestSellerList = await response.json()
            setBestSellerList(bestSellerList)
        } catch (err) {
            console.error(err)
        }
    }
    function handleKeyDown(event: any) {
        if (event.key === 'Enter') {
            navigate("/results", { state: { search: { book } } });
        }
    };


    async function viewBookInfo(isbn: string) {
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                if (res.ok) {
                    const jsonData = await res.json()
                    navigate(`/book/${isbn}`, { state: { data: jsonData.items[0].volumeInfo.industryIdentifiers[0].identifier } })
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }

    return (
        <div className="w-full lg:w-1/4 mt-4 lg:h-full flex flex-col gap-4">
            <div className="flex gap-2 w-full justify-center">
                <input onKeyDown={handleKeyDown} type="text" placeholder='Search by Author or Title' className="border border-book-sage w-3/4 flex-shrink-0 rounded-full p-3" onChange={(e) => setBook(e.target.value)} />
                <Link to={'/results'} state={{ search: { book } }}><button className="py-3 px-4 rounded-full button-colors">Search</button></Link>
            </div>
            <div className="hidden lg:flex flex-col gap-4 max-h-full overflow-auto hideScrollbar">
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold">Best Sellers</p>
                    <p className="text-black/60 text-lg">{moment().format("MMMM Do YYYY")}</p>
                </div>
                {bestSellerList && bestSellerList[0].books.map((content, index: number) => {
                    return <div key={index} className="flex items-center gap-2 hoverFloat rounded p-3" onClick={() => viewBookInfo(content.primary_isbn13)}>
                        <div className="text-2xl bg-book-green text-book-light size-10 centered rounded-full">{content.rank}</div>
                        <div className="flex items-center gap-2 hover:underline">
                            <img src={content.book_image} alt="" className="h-36" />
                            <p className="text-lg">{content.title}</p>
                        </div>
                    </div>
                })}
            </div>
        </div >
    )
}