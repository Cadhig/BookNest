import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Shelf from "../assets/Shelf.jpg"

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [showAlert, setShowAlert] = useState<boolean>(false)

  function displayAlert() {
    setShowAlert(true)
  }

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
    setShowAlert(false)
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
    setShowAlert(false)
  }

  async function login() {
    const data = {
      username: username,
      password: password
    }
    await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
      .then((res) => {
        if (res.ok) {
          console.log(res)
          console.log('Success!')
          return navigate('/homepage')
        } else {
          console.log(res)
          displayAlert()
          return console.log('Something went wrong!')
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className="h-svh flex">
      <div className="h-full w-full flex flex-col items-center justify-center text-book-dark default-font flex-shrink-0 lg:w-1/2">
        <div className="w-3/4 lg:w-1/2 flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-3xl">Welcome Back to Book Nest!</h1>
          <div className="w-full">
            <p className="text-lg">Username</p>
            <input type="text" placeholder="username" onChange={handleUsernameChange} className="border-book-green border rounded p-2 w-full" />
          </div>
          <div className="w-full">
            <p className="text-lg">Password</p>
            <input type="password" placeholder="******" onChange={handlePasswordChange} className="border-book-green border rounded p-2 w-full" />
          </div>
          <button className="bg-book-green w-full py-2 rounded text-xl active:bg-book-green/80 hover:bg-book-green-hover text-book-light" onClick={login}>Login</button>
          <div className={showAlert ? 'inline text-red-500' : 'hidden'}>Incorrect login credentials</div>
          <div className="flex text-lg gap-1">
            <p>Don't have an account?</p>
            <Link to={'/signup'} className="text-blue-500 hover:underline"><p className="text-blue-500 hover:underline">Signup</p></Link>
          </div>
        </div>
      </div>
      <img src={Shelf} alt="bookshelf" className="w-1/2 object-cover hidden lg:block" />
    </div>
  )

}

export default Login
