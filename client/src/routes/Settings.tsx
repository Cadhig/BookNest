import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../components/base/MobileHeader";
import MobileMenu from "../components/base/MobileMenu";
import Sidebar from "../components/base/Sidebar";
import RightSidebar from "../components/base/RightSidebar";

export default function Settings() {
    const navigate = useNavigate()
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
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
    const [showProfilePicture, setShowProfilePicture] = useState<string>('hidden')
    const [showCoverPicture, setShowCoverPicture] = useState<string>('hidden')
    const [imageFile, setImageFile] = useState<File>()
    const [alertClass, setAlertClass] = useState<string>('hidden')
    const [alertText, setAlertText] = useState<string>()

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


    const onChange = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files
        if (files && files.length > 0) {
            setImageFile(files[0])
        }
    }

    async function changePicture(endpoint: string, type: string) {
        console.log('here')
        await fetch(`${import.meta.env.VITE_API_ROUTE}/s3`)
            .then(async (res) => {
                if (res.ok) {
                    const secureURL = await res.json()
                    await fetch(secureURL.url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        body: imageFile
                    })
                    const imageURL = secureURL.url.split('?')[0]
                    const data = {
                        AWSImageUrl: imageURL
                    }
                    console.log(data)
                    await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/${endpoint}`, {
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
                                setAlertText(`Successfully updated ${type} picture!`)
                            } else {
                                console.log(res)
                                setAlertClass('inline text-red-500 text-lg')
                                setAlertText('Something went wrong!')
                                return
                            }
                        })
                }
            })
    }


    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={showMobileMenu ? "mobileMenuStyles w3-animate-left" : "hidden"} />
            <MobileHeader setMobileMenu={setShowMobileMenu} />
            <div className="flex flex-col-reverse lg:flex-row">
                <Sidebar />
                <div className="lg:w-1/2 flex flex-col gap-4 mt-4" onClick={() => setShowMobileMenu(false)}>
                    <p className="text-center text-2xl">Account Settings</p>
                    {/* profile picture */}
                    <div className="flex flex-col gap-4 items-center text-xl">
                        <div className="flex flex-col gap-4 w-3/4 lg:w-1/4">
                            <button className="text-xl bg-book-green text-book-light hover:border-book-green-hover cursor-pointer rounded-full p-2 " onClick={() => setShowProfilePicture('flex flex-col gap-4')}>Change Profile Picture</button>
                            <div className={showProfilePicture}>
                                <input type="file" accept="image/*" onChange={(e) => onChange(e)} />
                                <p className={alertClass}>{alertText}</p>
                                <button className="bg-book-green text-book-light p-2 rounded-full hover:bg-book-green-hover" onClick={() => changePicture('profilePicture', 'profile')}>Submit</button>
                                <button className="text-sm text-red-500" onClick={() => {
                                    setAlertClass('hidden')
                                    setShowProfilePicture('hidden')
                                }}>close</button>
                            </div>
                        </div>
                        {/* cover picture */}
                        <div className="flex flex-col gap-4 w-3/4 lg:w-1/4">
                            <button className="text-xl bg-book-green text-book-light hover:border-book-green-hover cursor-pointer rounded-full p-2 " onClick={() => setShowCoverPicture('flex flex-col gap-4')}>Change Cover Picture</button>
                            <div className={showCoverPicture}>
                                <input type="file" accept="image/*" onChange={(e) => onChange(e)} />
                                <p className={alertClass}>{alertText}</p>
                                <button className="bg-book-green text-book-light p-2 rounded-full hover:bg-book-green-hover" onClick={() => changePicture('coverPicture', 'cover')}>Submit</button>
                                <button className="text-sm text-red-500" onClick={() => {
                                    setAlertClass('hidden')
                                    setShowProfilePicture('hidden')
                                }}>close</button>
                            </div>
                        </div>
                        {/* password */}
                        <div className="flex flex-col gap-4 w-3/4 lg:w-1/4">
                            <button className="text-xl bg-book-green text-book-light hover:border-book-green-hover cursor-pointer rounded-full p-2 " onClick={() => setShowPassword('flex flex-col gap-4')}>Edit Password</button>
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
                        <div className="flex flex-col gap-4 w-3/4 lg:w-1/4">
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
                        <div className="flex flex-col gap-4 w-3/4 lg:w-1/4">
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
                        <div className="flex flex-col gap-4 w-3/4 lg:w-1/4">
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