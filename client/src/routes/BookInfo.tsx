import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import { ImAmazon, ImAppleinc } from "react-icons/im"

export default function BookInfo() {
    const location = useLocation()
    const { from } = location.state
    console.log(from)

    return (
        <div>
            <Header />
            <div>
                <img src={from.content.book_image} alt={from.content.title} />
                <div>
                    <p>{from.content.title}</p>
                    <p>{from.content.author}</p>
                    <p>{from.content.description}</p>
                    <div>
                        <p>Buy</p>
                        <div>
                            <a href={from.content.buy_links[0].url} target="_blank"><ImAmazon /></a>
                            <a href={from.content.buy_links[1].url} target="_blank"><ImAppleinc /></a>
                        </div>
                    </div>
                    <div>
                        <p>Publisher</p>
                        <p>{from.content.publisher}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}