import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from 'semantic-ui-react'
import Shelf from "../assets/Shelf.jpg"

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

    setIsLoading(true)

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
          setIsLoading(false)
          return navigate('/homepage')
        } else {
          console.log(res)
          displayAlert()
          setIsLoading(false)
          return console.log('Something went wrong!')
        }
      })
      .catch((err) => console.error(err))
  }

  function attemptLoginOnKeyDown(event: any) {
    if (event.key === 'Enter') {
      login()
    }
  };

  function switchInputField(event: any) {
    if (event.key === "Enter") {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();

    }
  }


  return (
    <div className="h-svh flex flex-col lg:flex-row">
      <img src={Shelf} alt="bookshelf" className="absolute lg:relative z-10 w-full lg:w-1/2 h-1/2 lg:h-full object-cover " />
      <div className="z-20 h-1/2 bg-white rounded-3xl mt-96 lg:mt-0 w-full flex flex-col items-center justify-center flex-shrink-0 lg:w-1/2 lg:h-full default-font">
        <div className="centered w-3/4 lg:w-1/2 flex-col gap-4 ">
          <h1 className="text-3xl">Welcome Back to Book Nest!</h1>
          <form className="w-full text-lg flex flex-col gap-4">
            <div>
              <p className="pl-2">Username</p>
              <input onKeyDown={switchInputField} autoFocus={true} type="text" placeholder="username" onChange={handleUsernameChange} className="border-book-green border rounded-full p-2 w-full" />
            </div>
            <div>
              <p className="pl-2">Password</p>
              <input onKeyDown={attemptLoginOnKeyDown} type="password" placeholder="******" onChange={handlePasswordChange} className="border-book-green border rounded-full p-2 w-full" />
            </div>
          </form>
          {isLoading ? <Button className=" w-full py-2 rounded-full text-xl button-colors" loading>Login</Button> : <button className=" w-full py-2 rounded-full text-xl button-colors" onClick={login}>Login</button>}
          <div className={showAlert ? 'inline text-red-500' : 'hidden'}>Incorrect login credentials</div>
          <div className="flex text-lg gap-1">
            <p>Don't have an account?</p>
            <Link to={'/signup'} className="text-blue-500 hover:underline"><p className="text-blue-500 hover:underline">Signup</p></Link>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Login
