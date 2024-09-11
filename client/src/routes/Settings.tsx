import MobileHeader from "../components/MobileHeader";
import MobileMenu from "../components/MobileMenu";
import Sidebar from "../components/Sidebar";
import placeholder from '../assets/profile.jpg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RightSidebar from "../components/RightSidebar";

export default function Settings() {
    const navigate = useNavigate()
    const [mobileMenu, setMobileMenu] = useState<string>('hidden')
    const [showPassword, setShowPassword] = useState<string>('hidden')
    const [oldPassword, setOldPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>()
    const [showBio, setShowBio] = useState<string>('hidden')
    const [bio, setBio] = useState<string>()
    const [showLocation, setShowLocation] = useState<string>('hidden')
    const [location, setLocation] = useState<string>()
    const [showBirthday, setShowBirthday] = useState<string>('hidden')
    const [birthday, setBirthday] = useState<string>()
    const [alertClass, setAlertClass] = useState<string>('hidden')
    const [alertText, setAlertText] = useState<string>()

    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("mobileMenuStyles w3-animate-left")
        } else {
            setMobileMenu('hidden')
        }
    }

    async function changePassword() {
        if (newPassword !== confirmNewPassword) {
            setAlertClass('inline text-red-500 text-lg')
            setAlertText('Passwords do not match!')
            return
        }
        const data = {
            oldPassword: oldPassword,
            password: newPassword
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/changePass`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    setAlertClass('inline text-book-green text-lg')
                    setAlertText('Password update successful!')
                } else {
                    console.log(res)
                    setAlertClass('inline text-red-500 text-lg')
                    setAlertText('Old password invalid')
                    return console.log('Something went wrong!')
                }
            })
            .catch((err) => console.error(err))
    }

    async function changeBio() {
        const data = {
            bio: bio
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/bio`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    setAlertClass('inline text-book-green text-lg')
                    setAlertText('Bio update successful!')
                } else {
                    console.log(res)
                    setAlertClass('inline text-red-500 text-lg')
                    setAlertText('Something went wrong!')
                    return
                }
            })
            .catch((err) => console.error(err))
    }


    async function changeLocation() {
        const data = {
            location: location
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/location`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    setAlertClass('inline text-book-green text-lg')
                    setAlertText('Location update successful!')
                } else {
                    console.log(res)
                    setAlertClass('inline text-red-500 text-lg')
                    setAlertText('Something went wrong!')
                    return
                }
            })
            .catch((err) => console.error(err))
    }

    async function changeBirthday() {
        const data = {
            birthday: birthday
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/birthday`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    setAlertClass('inline text-book-green text-lg')
                    setAlertText('Birthday update successful!')
                } else {
                    console.log(res)
                    setAlertClass('inline text-red-500 text-lg')
                    setAlertText('Something went wrong!')
                    return
                }
            })
            .catch((err) => console.error(err))
    }

    async function Logout() {
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    console.log('success')
                    return navigate('/')
                } else {
                    console.log(res)
                    return
                }
            })
            .catch((err) => console.error(err))
    }


    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={mobileMenu} />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div className="flex flex-col-reverse lg:flex-row">
                <Sidebar />
                <div className="lg:w-1/2 flex flex-col gap-4 mt-4">
                    <p className="text-center text-2xl">Account Settings</p>
                    <div className="flex flex-col gap-4 items-center text-xl">
                        <img src={placeholder} alt="" className="rounded-full w-40" />
                        {/* password */}
                        <div className="flex flex-col gap-4 w-1/4">
                            <button className="text-xl bg-book-green text-book-light hover:border-book-green-hover cursor-pointer rounded-full p-2" onClick={() => setShowPassword('flex flex-col gap-4')}>Edit Password</button>
                            <div className={showPassword}>
                                <input type="password" placeholder="Old password" className="border border-book-green rounded-full p-2" onChange={(e) => setOldPassword(e.target.value)} />
                                <input type="password" placeholder="New password" className="border border-book-green rounded-full p-2" onChange={(e) => setNewPassword(e.target.value)} />
                                <input type="password" placeholder="Confirm new password" className="border border-book-green rounded-full p-2" onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                <p className={alertClass}>{alertText}</p>
                                <button className="bg-book-green text-book-light p-2 rounded-full hover:bg-book-green-hover" onClick={() => changePassword()}>Submit</button>
                                <button className="text-sm text-red-500" onClick={() => {
                                    setAlertClass('hidden')
                                    setShowPassword('hidden')
                                }}>close</button>
                            </div>
                        </div>
                        {/* bio */}
                        <div className="flex flex-col gap-4 w-1/4">
                            <button className="text-xl bg-book-green text-book-light hover:border-book-green-hover cursor-pointer rounded-full p-2" onClick={() => setShowBio('flex flex-col gap-4')}>Edit Bio</button>
                            <div className={showBio}>
                                <input type="text" placeholder="About you...." className="border border-book-green rounded-full p-2" onChange={(e) => setBio(e.target.value)} />
                                <p className={alertClass}>{alertText}</p>
                                <button className="bg-book-green hover:bg-book-green-hover text-book-light p-2 rounded-full" onClick={() => changeBio()}>Submit</button>
                                <button className="text-sm text-red-500" onClick={() => {
                                    setShowBio('hidden')
                                    setAlertClass('hidden')
                                }}>close</button>
                            </div>
                        </div>
                        {/* location */}
                        <div className="flex flex-col gap-4 w-1/4">
                            <button className="text-xl bg-book-green text-book-light hover:border-book-green-hover cursor-pointer rounded-full p-2" onClick={() => setShowLocation('flex flex-col gap-4')}>Edit Location</button>
                            <div className={showLocation}>
                                <input type="text" placeholder="Location" className="border border-book-green rounded-full p-2" onChange={(e) => setLocation(e.target.value)} />
                                <p className={alertClass}>{alertText}</p>
                                <button className="bg-book-green hover:bg-book-green-hover text-book-light p-2 rounded-full" onClick={() => changeLocation()}>Submit</button>
                                <button className="text-sm text-red-500" onClick={() => {
                                    setShowLocation('hidden')
                                    setAlertClass('hidden')
                                }}>close</button>
                            </div>
                        </div>
                        {/* Birthday */}
                        <div className="flex flex-col gap-4 w-1/4">
                            <button className="text-xl bg-book-green text-book-light hover:border-book-green-hover cursor-pointer rounded-full p-2" onClick={() => setShowBirthday('flex flex-col gap-4')}>Edit Birthday</button>
                            <div className={showBirthday}>
                                <input type="text" placeholder="Birthday" className="border border-book-green rounded-full p-2" onChange={(e) => setBirthday(e.target.value)} />
                                <p className={alertClass}>{alertText}</p>
                                <button className="bg-book-green hover:bg-book-green-hover text-book-light p-2 rounded-full" onClick={() => changeBirthday()}>Submit</button>
                                <button className="text-sm text-red-500" onClick={() => {
                                    setShowBirthday('hidden')
                                    setAlertClass('hidden')
                                }}>close</button>
                            </div>
                        </div>
                        <button className="text-xl">Display</button>
                        <button className="bg-red-600 text-book-light rounded-full py-2 px-4" onClick={() => Logout()}>Logout</button>
                    </div>
                </div>
                <RightSidebar />
            </div>
        </div>
    )
}