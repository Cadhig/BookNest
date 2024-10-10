import { bookInfoChildren } from "../../types"
import { ImAmazon } from "react-icons/im"
import { FaGooglePlay } from "react-icons/fa"
import { Rating } from "semantic-ui-react"
import { ReviewProps } from "../../types"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function BookImageColumn(props: bookInfoChildren) {
    const location = useLocation()
    const { data, isFromSearchResults } = location.state
    const [review, setReview] = useState<ReviewProps | undefined>()
    useEffect(() => {
        getReviewAverage()
    }, [])
    async function getReviewAverage() {
        const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/books/reviews/${isFromSearchResults ? data.industryIdentifiers[0].identifier : data}`)
        const reviews = await response.json()
        if (reviews.length < 1) {
            setReview({
                reviewAverage: 0,
                reviewLength: reviews.length,
                reviewAlert: true
            })
            return
        }
        let currentNum = 0
        for (let i = 0; i < reviews.length; i++) {
            currentNum += reviews[i].reviewRating
        }
        const reviewAverage = currentNum / reviews.length
        setReview({
            reviewAverage: reviewAverage,
            reviewLength: reviews.length,
            reviewAlert: false
        })
    }
    const amazonLink = `https://www.amazon.com/s?k=${props.bookData && props.bookData.items[0].volumeInfo.industryIdentifiers[0].identifier}&i=stripbooks&linkCode=qs`
    console.log(props.review?.reviewAverage)
    return (
        <div className="flex w-full lg:w-1/2 flex-col items-center gap-4">
            <img src={props.bookData && props.bookData.items[0].volumeInfo.imageLinks?.thumbnail} alt={props.bookData && props.bookData.items[0].volumeInfo.title} className="size-1/2 md:size-1/4 lg:h-96 lg:w-60 object-contain" />
            <p className="lg:hidden  text-center text-4xl font-bold ">{props.bookData && props.bookData.items[0].volumeInfo.title}</p>
            <div className="flex items-center flex-col">
                <div className="text-2xl gap-2 flex items-center">
                    <Rating size="massive" icon={'star'} defaultRating={review && review.reviewAverage} maxRating={5} disabled key={review && review.reviewAverage} />
                    <p>{review && review.reviewAverage}/5</p>
                </div>
                <p className="text-black/60">{review && review.reviewAlert ? "No reviews yet!" : `${review && review.reviewLength} reviews`}</p>
            </div>
            <div onClick={() => props.switchBookmarkStatus?.()} className="text-2xl gap-2 hoverFloat flex">
                <p>Bookmark</p>
                <p className="text-3xl">{props.bookmark}</p>
            </div>
            <div className="flex gap-6">
                <a href={amazonLink} target="_blank" className="text-3xl hoverFloat"><ImAmazon /></a>
                <a target="_blank" className={props.showGooglePlay ? "block text-2xl hoverFloat" : "hidden"} href={props.bookData && props.bookData?.items[0].saleInfo.buyLink}><FaGooglePlay /></a>
            </div>
        </div>
    )
}