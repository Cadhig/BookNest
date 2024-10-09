import { bookInfoChildren } from "../../types"
import { useState } from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import moment from "moment"

export default function BookInformation(props: bookInfoChildren) {
    const [showMore, setShowMore] = useState<boolean>(false)

    return (
        <div className="w-full flex flex-col text-lg gap-4">
            <div className=" hidden lg:flex flex-col items-center gap-2">
                <p className="text-center text-4xl font-bold">{props.bookData && props.bookData.items[0].volumeInfo.title}</p>
                <p className="text-xl text-black/60">{props.bookData && props.bookData.items[0].volumeInfo.authors[0]}</p>
            </div>
            <div className={showMore ? "h-full" : "h-28 overflow-hidden text-ellipsis"}>
                <p>{props.bookData && props.bookData.items[0].volumeInfo.description}</p>
            </div>
            <button className="flex items-center gap-2" onClick={() => setShowMore(!showMore)}>
                <p className="font-bold">{showMore ? "Show less" : "Show more"}</p>
                {showMore ? <FaAngleUp className="text-xl" /> : <FaAngleDown className="text-xl" />}
            </button>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <p className="text-black/60">Genres:</p>
                    <p>{props.bookData && props.bookData.items[0].volumeInfo.categories}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-black/60">Publisher:</p>
                    <p>{props.bookData && props.bookData.items[0].volumeInfo.publisher}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-black/60">Published:</p>
                    <p>{moment(props.bookData && props.bookData.items[0].volumeInfo.publishedDate).format("MMMM Do YYYY")}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-black/60">ISBN:</p>
                    <p>{props.bookData && props.bookData.items[0].volumeInfo.industryIdentifiers[0].identifier}</p>
                </div>
            </div>
        </div>
    )
}