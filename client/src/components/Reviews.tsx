import { useEffect, useState } from "react"
import 'semantic-ui-css/semantic.min.css';
import moment from "moment"
import { Link } from "react-router-dom"
import { Rating } from "semantic-ui-react"

interface Reviews {
    bookImage?: string,
    bookIsbn?: string,
    bookName?: string,
    createdAt?: string,
    reviewRating?: number,
    reviewText?: string,
    username?: string,
    __v?: number,
    _id?: string
}

export default function Review(props: Reviews) {
    const [reviews, setReviews] = useState<any>()
    const [showReviewAlert, setShowReviewAlert] = useState(false)

    async function getReviews() {
        const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/books/reviews/${props.bookIsbn}`)
        const responseParsed = await response.json()
        if (responseParsed.length < 1) {
            setShowReviewAlert(true)
        }
        setReviews(responseParsed)
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <div className="flex flex-col m-2 gap-4 max-h-full w-full overflow-auto">
            <p className={showReviewAlert ? 'inline text-lg text-black/50 text-center' : 'hidden'}>Reviews yet!</p>
            {reviews && reviews.map((content: Reviews, index: number) => {
                return <div className="flex flex-col justify-center gap-4 text-lg" key={index}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 ">
                            <div className="flex gap-2 items-center">
                                <div className="flex flex-col">
                                    <Link to={'/profile'} state={{ from: content.username }}>
                                        <p className="hover:underline cursor-pointer font-bold">@{content.username}</p>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <Rating icon={'star'} defaultRating={content.reviewRating} maxRating={4} disabled />
                                <p className="text-ellipsis">{content.reviewText}</p>
                            </div>
                        </div>
                        <p className="text-right text-xs">{moment(content.createdAt).startOf('second').fromNow()}</p>
                    </div>
                    <div className="h-[1px] bg-book-green"></div>
                </div>
            })}
        </div>
    )
}