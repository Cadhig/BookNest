import { Link } from "react-router-dom"
import MobileHeader from "../components/MobileHeader"
import Shelf from "../assets/Shelf.jpg"
import Header from "../components/Header"

function App() {

  return (
    <div className="h-svh flex">
      <MobileHeader />
      <div className="h-full w-full flex flex-col items-center justify-center text-book-dark default-font flex-shrink-0 lg:w-1/2">
        <Header />
        <div className="w-3/4 md:w-1/2 lg:w-3/4 flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-3xl">Welcome Back!</h1>
          <div className="w-full">
            <p className="text-lg">Email</p>
            <input type="text" placeholder="you@email.com" className="border-book-green border rounded p-1 w-full" />
          </div>
          <div className="w-full">
            <p className="text-lg">Password</p>
            <input type="password" placeholder="******" className="border-book-green border rounded p-1 w-full" />
          </div>
          <button className="bg-book-sage w-full py-2 rounded text-xl">Login</button>
          <div className="flex gap-1">
            <p>Don't have an account?</p>
            <Link to={'/signup'} className="text-blue-500 hover:underline">Signup</Link>
          </div>
        </div>
      </div>
      <img src={Shelf} alt="bookshelf" className="w-1/2 object-cover hidden lg:block" />
    </div>
  )

}

export default App
