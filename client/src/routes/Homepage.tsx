import BestSellers from "../components/BestSellers"
import SearchBar from "../components/SearchBar"
export default function Homepage() {

    return (
        <div className="flex flex-col-reverse md:flex-row m-2 h-svh">
            <div className="md:w-1/4">
                <BestSellers />
            </div>
            <SearchBar />
        </div>
    )
}