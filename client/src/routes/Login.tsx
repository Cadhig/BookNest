import { Link, useNavigate } from "react-router-dom"
import MobileHeader from "../components/MobileHeader"
import Shelf from "../assets/Shelf.jpg"
import Header from "../components/Header"
import { useState } from "react"

function App() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<String>()
  const [password, setPassword] = useState<String>()

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  async function login() {
    const data = {
      username: username,
      password: password
    }
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        console.log('Success!')
      } else {
        console.log('Something went wrong!')
      }
    } catch (err) {
      return console.error(err)
    }
    return navigate('/homepage')

  }

  return (
    <div className="h-svh flex">
      <MobileHeader />
      <div className="h-full w-full flex flex-col items-center justify-center text-book-dark default-font flex-shrink-0 lg:w-1/2">
        <Header />
        <div className="w-3/4 md:w-1/2 lg:w-3/4 flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-3xl">Welcome Back!</h1>
          <div className="w-full">
            <p className="text-lg">Username</p>
            <input type="text" placeholder="username" onChange={handleUsernameChange} className="border-book-green border rounded p-1 w-full" />
          </div>
          <div className="w-full">
            <p className="text-lg">Password</p>
            <input type="password" placeholder="******" onChange={handlePasswordChange} className="border-book-green border rounded p-1 w-full" />
          </div>
          <button className="bg-book-sage w-full py-2 rounded text-xl" onClick={login}>Login</button>
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