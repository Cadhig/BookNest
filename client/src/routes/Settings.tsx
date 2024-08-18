import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import MobileMenu from "../components/MobileMenu";
import Sidebar from "../components/Sidebar";
import placeholder from '../assets/profile.jpg'
import { useState } from "react";

export default function Settings() {
    const [mobileMenu, setMobileMenu] = useState<string>('hidden')
    const [showPassword, setShowPassword] = useState<string>('hidden')
    const [showBio, setShowBio] = useState<string>('hidden')
    const [showLocation, setShowLocation] = useState<string>('hidden')
    const [showBirthday, setShowBirthday] = useState<string>('hidden')

    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("mobileMenuStyles w3-animate-left")
        } else {
            setMobileMenu('hidden')
        }
    }

    return (
        <div className="h-svh">
            <MobileMenu mobileMenu={mobileMenu} />
            <Header />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div className="flex">
                <Sidebar />
                <div className="md:border md:border-book-green w-full mx-2 flex flex-col gap-4 p-4">
                    <p className="text-center text-2xl">Account Settings</p>
                    <div className="flex flex-col gap-4 items-center text-xl">
                        <img src={placeholder} alt="" className="rounded-full w-40" />
                        {/* password */}
                        <div className="flex flex-col gap-4">
                            <button className="text-xl hover:underline" onClick={() => setShowPassword('flex flex-col gap-4')}>Edit Password</button>
                            <div className={showPassword}>
                                <input type="password" placeholder="Old password" className="border border-book-green rounded-full p-2" />
                                <input type="password" placeholder="New password" className="border border-book-green rounded-full p-2" />
                                <input type="password" placeholder="Confirm new password" className="border border-book-green rounded-full p-2" />
                                <button className="bg-book-green text-book-light p-2 rounded-full">Submit</button>
                                <button className="text-sm text-red-500" onClick={() => setShowPassword('hidden')}>close</button>
                            </div>
                        </div>
                        {/* bio */}
                        <div className="flex flex-col gap-4">
                            <button className="text-xl" onClick={() => setShowBio('flex flex-col gap-4')}>Edit Bio</button>
                            <div className={showBio}>
                                <input type="text" placeholder="About you...." className="border border-book-green rounded-full p-2" />
                                <button className="bg-book-green text-book-light p-2 rounded-full">Submit</button>
                                <button className="text-sm text-red-500" onClick={() => setShowBio('hidden')}>close</button>
                            </div>
                        </div>
                        {/* location */}
                        <div className="flex flex-col gap-4">
                            <button className="text-xl" onClick={() => setShowLocation('flex flex-col gap-4')}>Edit Location</button>
                            <div className={showLocation}>
                                <input type="text" placeholder="Location" className="border border-book-green rounded-full p-2" />
                                <button className="bg-book-green text-book-light p-2 rounded-full">Submit</button>
                                <button className="text-sm text-red-500" onClick={() => setShowLocation('hidden')}>close</button>
                            </div>
                        </div>
                        {/* Birthday */}
                        <div className="flex flex-col gap-4">
                            <button className="text-xl" onClick={() => setShowBirthday('flex flex-col gap-4')}>Edit Birthday</button>
                            <div className={showBirthday}>
                                <input type="text" placeholder="Birthday" className="border border-book-green rounded-full p-2" />
                                <button className="bg-book-green text-book-light p-2 rounded-full">Submit</button>
                                <button className="text-sm text-red-500" onClick={() => setShowBirthday('hidden')}>close</button>
                            </div>
                        </div>
                        <button className="text-xl">Display</button>
                        <button className="bg-red-600 text-book-light rounded-full py-2 px-4">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}