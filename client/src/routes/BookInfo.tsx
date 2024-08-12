import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import { ImAmazon, ImAppleinc } from "react-icons/im"
import MobileHeader from "../components/MobileHeader"
import BestSellers from "../components/BestSellers"

export default function BookInfo() {
    const location = useLocation()
    const { from } = location.state
    console.log(from)

    return (
        <div className="flex">
            <div className="hidden md:w-1/4 md:flex">
                <BestSellers />
            </div>
            <div className="default-font m-2 flex flex-col items-center">
                {/* <MobileHeader />
                <Header /> */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <img src={from.content.book_image} alt={from.content.title} className="w-32 md:w-64" />
                        <div className="flex flex-col gap-2 text-center">
                            <p className="text-2xl">{from.content.title}</p>
                            <p >{from.content.description}</p>
                            <div className="flex gap-4 justify-center">
                                <a href={from.content.buy_links[0].url} target="_blank" className="text-3xl"><ImAmazon /></a>
                                <a href={from.content.buy_links[1].url} target="_blank" className="text-3xl"><ImAppleinc /></a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-center">
                        <div>
                            <p>Publisher</p>
                            <p>{from.content.publisher}</p>
                        </div>
                        <div className="h-14 bg-black w-[1px]"></div>
                        <div>
                            <p>Author</p>
                            <p>{from.content.author}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}