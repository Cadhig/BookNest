import { Link, useNavigate } from "react-router-dom"
import Shelf from "../assets/Shelf.jpg"
import { useState } from "react"

export default function Signup() {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [verifyPassword, setVerifyPassword] = useState<string>()
    const [alertClass, setAlertClass] = useState<string>('hidden')
    const [alertType, setAlertType] = useState<string>()

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
        setAlertClass('hidden')
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
        setAlertClass('hidden')
    }
    function handleVerifyPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setVerifyPassword(event.target.value)
        setAlertClass('hidden')
    }

    function Alerts(aClass: string, aType: string) {
        setAlertClass(aClass)
        setAlertType(aType)
    }


    async function signup() {
        if (password !== verifyPassword) {
            return Alerts('inline text-red-500', "Passwords do not match!")
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
                return navigate('/')
            } else {
                Alerts('inline text-red-500', 'Username taken!')
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
                        <input type="text" placeholder="username" onChange={handleUsernameChange} className="border-book-green border rounded p-1 w-full" />
                    </div>
                    <div className="w-full">
                        <p className="text-lg">Password</p>
                        <input type="password" placeholder="******" onChange={handlePasswordChange} className="border-book-green border rounded p-1 w-full" />
                    </div>
                    <div className="w-full">
                        <p className="text-lg">Password</p>
                        <input type="password" placeholder="******" onChange={handleVerifyPasswordChange} className="border-book-green border rounded p-1 w-full" />
                    </div>
                    <p className={alertClass}>{alertType}</p>
                    <button className="bg-book-green w-full py-2 rounded text-xl hover:bg-book-green/90 active:bg-book-green/80 text-book-light" onClick={signup}>Signup</button>
                    <div className="flex gap-1">
                        <p>Already have an acccount?</p>
                        <Link to={'/'} className="text-blue-500 hover:underline">Login</Link>
                    </div>
                </div>
            </div>
            <img src={Shelf} alt="bookshelf" className="w-1/2 object-cover hidden lg:block" />
        </div>
    )

}
