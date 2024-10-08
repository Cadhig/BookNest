import { Link, useNavigate } from "react-router-dom"
import Shelf from "../assets/Shelf.jpg"
import { useState } from "react"

export default function Signup() {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [verifyPassword, setVerifyPassword] = useState<string>()
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>()

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
        setShowAlert(false)
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
        setShowAlert(false)
    }
    function handleVerifyPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setVerifyPassword(event.target.value)
        setShowAlert(false)
    }

    function Alerts(message: string) {
        setShowAlert(true)
        setAlertMessage(message)
    }


    async function signup() {
        if (password !== verifyPassword) {
            return Alerts("Passwords do not match!")
        }
        const data = {
            username: username,
            password: password
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/signup`, {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                window.alert('Account creation successful')
                console.log('Success!')
                return navigate('/homepage')
            } else {
                Alerts('Username taken!')
                console.log('Something went wrong!')
            }
        } catch (err) {
            return console.error(err)
        }

    }

    return (
        <div className="h-svh flex">
            <div className="h-full w-full flex flex-col items-center justify-center text-book-dark default-font flex-shrink-0 lg:w-1/2">
                <div className="w-3/4 lg:w-1/2 flex flex-col items-center justify-center gap-4 ">
                    <h1 className="text-3xl">Welcome to BookNest!</h1>
                    <div className="w-full">
                        <p className="text-lg">Username</p>
                        <input type="text" placeholder="username" onChange={handleUsernameChange} className="border-book-green border rounded p-2 w-full" />
                    </div>
                    <div className="w-full">
                        <p className="text-lg">Password</p>
                        <input type="password" placeholder="******" onChange={handlePasswordChange} className="border-book-green border rounded p-2 w-full" />
                    </div>
                    <div className="w-full">
                        <p className="text-lg">Password</p>
                        <input type="password" placeholder="******" onChange={handleVerifyPasswordChange} className="border-book-green border rounded p-2 w-full" />
                    </div>
                    <p className={showAlert ? 'inline text-red-500' : 'hidden'}>{alertMessage}</p>
                    <button className="w-full py-2 rounded text-xl button-colors" onClick={signup}>Signup</button>
                    <div className="flex text-lg gap-1">
                        <p>Already have an acccount?</p>
                        <Link to={'/'}><p className="text-blue-500 hover:underline">Login </p></Link>
                    </div>
                </div>
            </div>
            <img src={Shelf} alt="bookshelf" className="w-1/2 object-cover hidden lg:block" />
        </div>
    )

}
