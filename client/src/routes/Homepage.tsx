import BestSellers from "../components/BestSellers"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
export default function Homepage() {

    return (
        <div className="flex flex-col-reverse md:flex-row m-2 h-svh">
            <div className="md:w-1/4">
                <BestSellers />
            </div>
            <div className="flex flex-col w-full">
                <Header />
                <SearchBar />
            </div>
        </div>
    )
}