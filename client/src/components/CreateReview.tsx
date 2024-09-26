import { useEffect, useState } from "react"
import 'semantic-ui-css/semantic.min.css';
import { Rating, RatingProps } from 'semantic-ui-react'

export default function Reviews(props: any) {
    const [reviewText, setReviewText] = useState<string>()
    const [rating, setRating] = useState<number>()

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
                console.log(response)
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
        <div className="p-2 flex flex-col gap-2 mt-4 lg:mt-0">
            <div className='flex gap-2 justify-center items-center'>
                {/* <img src={props.userData[0].profilePicture && props.userData[0].profilePicture} alt="" className='size-14 rounded-full object-cover' /> */}
                <input type="text" placeholder='What are you reading...' className='border border-book-green w-full rounded-full h-10 p-2' onChange={(e) => {
                    setReviewText(e.target.value)
                }} />
                <Rating rating={rating} icon='star' defaultRating={0} maxRating={4} onRate={handleRatingChange} />
            </div>
            <div className='flex justify-between items-center'>
                <button className='bg-book-green text-book-light px-4 py-2 rounded-full hover:bg-book-green-hover' onClick={sendReview}>Post Review</button>
            </div>
        </div>
    )
}