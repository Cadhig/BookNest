import { Link, useNavigate } from "react-router-dom"
import Shelf from "../assets/Shelf.jpg"
import { useState } from "react"
import { Button } from "semantic-ui-react"

export default function Signup() {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [verifyPassword, setVerifyPassword] = useState<string>()
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
        setIsLoading(true)
        const data = {
            username: username,
            password: password,
            password2: verifyPassword
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
                setIsLoading(false)
                return navigate('/homepage')
            } else {
                const errorText = await response.json()
                console.log(errorText)
                Alerts(errorText.error)
                setIsLoading(false)
                console.log(errorText)
            }
        } catch (err) {
            return console.error(err)
        }

    }

    function handleKeyDown(event: any) {
        if (event.key === 'Enter') {
            signup()
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
                    <h1 className="text-3xl">Welcome to BookNest!</h1>
                    <form className="w-full text-lg flex flex-col gap-4">
                        <div>
                            <p className="pl-2">Username</p>
                            <input onKeyDown={switchInputField} autoFocus={true} type="text" placeholder="username" onChange={handleUsernameChange} className="border-book-green border rounded-full p-2 w-full" />
                        </div>
                        <div>
                            <p className="pl-2">Password</p>
                            <input onKeyDown={switchInputField} type="password" placeholder="******" onChange={handlePasswordChange} className="border-book-green border rounded-full p-2 w-full" />
                        </div>
                        <div>
                            <p className="pl-2">Verify password</p>
                            <input onKeyDown={handleKeyDown} type="password" placeholder="******" onChange={handleVerifyPasswordChange} className="border-book-green border rounded-full p-2 w-full" />
                        </div>
                    </form>
                    <p className={showAlert ? 'inline text-red-500' : 'hidden'}>{alertMessage}</p>
                    {isLoading ? <Button className=" w-full py-2 rounded-full text-xl button-colors" loading>Signup</Button> : <button className="w-full py-2 rounded-full text-xl button-colors" onClick={signup}>Signup</button>}
                    <div className="flex text-lg gap-1">
                        <p>Already have an acccount?</p>
                        <Link to={'/'}><p className="text-blue-500 hover:underline">Login </p></Link>
                    </div>
                </div>
            </div>
        </div>
    )

}
