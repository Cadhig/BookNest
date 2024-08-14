import { Rating } from "semantic-ui-react"
export default function Reviews() {

    return (
        <div className="flex flex-col items-center">
            <Rating icon='star' defaultRating={3} maxRating={4} />
            Reviews
        </div>
    )
}