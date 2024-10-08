import { useEffect, useState } from "react"
import { Rating, RatingProps } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default function Reviews(props: any) {
    const [reviewText, setReviewText] = useState<string>()
    const [rating, setRating] = useState<number>()
    const [error, setError] = useState<boolean>(false)
    useEffect(() => {
        setRating(0)
    }, [])

    async function sendReview() {
        const data = {
            bookIsbn: props.bookData.items[0].volumeInfo.industryIdentifiers[0].identifier,
            bookName: props.bookData.items[0].volumeInfo.title,
            bookImage: props.bookData.items[0].volumeInfo.imageLinks?.thumbnail,
            reviewText: reviewText,
            reviewRating: rating
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/books/review`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((response) => {
                if (!response.ok) {
                    setError(true)
                }
                props.setRefreshFeed(!props.refreshFeed)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    function handleRatingChange(e: React.MouseEvent<HTMLDivElement>, props: RatingProps) {
        e.preventDefault()
        const rating = typeof props.rating === 'number' ? props.rating : 0;
        setRating(rating)
    }

    return (
        <div className="p-2 flex flex-col gap-2 mt-4 lg:mt-0 w-1/2">
            <div className='gap-2 flex-col centered'>
                <div className="flex gap-2 text-xl items-center">
                    <div>Rate</div>
                    <Rating rating={rating} icon='star' defaultRating={0} maxRating={5} onRate={handleRatingChange} size='huge' />
                </div>
                <input type="text" placeholder="What did you think about this book?" className='border border-book-green w-full rounded-full h-10 p-2' onChange={(e) => {
                    setReviewText(e.target.value)
                }} />
                <p className={error ? 'text-right text-red-600' : 'hidden'}>You have already posted a review!</p>
                <button className='px-4 py-2 rounded-full button-colors' onClick={sendReview}>Post Review</button>
            </div>
        </div>
    )
}