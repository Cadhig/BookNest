import { useEffect, useState } from "react"
import 'semantic-ui-css/semantic.min.css';
import moment from "moment"
import { Rating } from "semantic-ui-react"
import { Link } from "react-router-dom";

interface Reviews {
    isFromBookInfoPage: boolean
    bookImage?: string,
    bookIsbn?: string,
    bookName?: string,
    createdAt?: string,
    reviewRating?: number,
    reviewText?: string,
    username?: string,
    __v?: number,
    _id?: string,
    refreshFeed?: boolean
    userReviews?: Reviews[]
}

export default function Review(props: Reviews) {
    const [reviews, setReviews] = useState<any>()
    const [showReviewAlert, setShowReviewAlert] = useState(false)

    useEffect(() => {
        if (props.isFromBookInfoPage) {
            getReviews()
        }
        if (!props.isFromBookInfoPage) {
            if (props.userReviews?.length === 0) {
                setShowReviewAlert(true)
            }
            setReviews(props.userReviews)
        }
    }, [props.refreshFeed])

    async function getReviews() {
        const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/books/reviews/${props.bookIsbn}`)
        const userReviews = await response.json()
        if (userReviews.length < 1) {
            setShowReviewAlert(true)
        }
        setReviews(userReviews)
    }

    return (
        <div className="flex flex-col m-2 gap-4 max-h-full overflow-auto">
            <p className={showReviewAlert ? 'inline text-lg text-black/50 text-center' : 'hidden'}>No reviews yet!</p>
            {reviews && reviews.map((content: Reviews, index: number) => {
                return <div className="flex flex-col justify-center gap-4 text-lg" key={index}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-2">
                                    <Link to={'/profile'} state={{ from: content.username }}>
                                        <p className="hover:underline cursor-pointer font-bold">@{content.username}</p>
                                    </Link>
                                    <Link to={'/bookInfo'} state={{ data: content.bookIsbn }}>
                                        <p className={props.isFromBookInfoPage ? "hidden" : "text-book-dark/60"}>Reviewed: {content.bookName}</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Link to={'/bookInfo'} state={{ data: content.bookIsbn }}>
                                    <div className={props.isFromBookInfoPage ? "hidden" : "h-40 w-32 items-center justify-center"}>
                                        <img src={content.bookImage} alt={content.bookName} className="size-full object-contain" />
                                    </div>
                                </Link>
                                <div className="flex flex-col gap-4">
                                    <p className="text-xl font-bold">Rating: <Rating size="large" icon={'star'} defaultRating={content.reviewRating} maxRating={5} disabled /></p>
                                    <p>{content.reviewText}</p>
                                </div>
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