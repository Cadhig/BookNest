import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import MobileMenu from "../components/MobileMenu"
import MobileHeader from "../components/MobileHeader"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import ProfilePosts from "../components/ProfilePosts"
import CoverAndProfilePicture from "../components/CoverAndProfilePicture"



export default function Profile() {
    const location = useLocation()
    const { from } = location.state
    const [apiData, setApiData] = useState<any>()
    const [mobileMenu, setMobileMenu] = useState<string>('hidden')
    const [hideLocation, setHideLocation] = useState<string>('flex gap-2 items-center')
    const [hideBirthday, setHideBirthday] = useState<string>('flex gap-2 items-center')
    const [postAlert, setPostAlert] = useState<string>('hidden')

    useEffect(() => {
        fetchData()
    }, [from])
    console.log(apiData)

    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("absolute z-30 mobileMenuStyles w3-animate-left")
        } else {
            setMobileMenu('hidden')
        }
    }

    async function fetchData() {
        const data = {
            username: from
        }
        await fetch(`http://localhost:3000/api/user/profile`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then(async (res) => {
                if (res.ok) {
                    const jsonData = await res.json()
                    setApiData(jsonData)
                    if (!jsonData[0].location) {
                        setHideLocation('hidden')
                    }
                    if (!jsonData[0].birthday) {
                        setHideBirthday('hidden')
                    }
                    if (!jsonData[0].posts[0]) {
                        setPostAlert('inline text-lg text-black/50 text-center')
                    }
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }

    return (
        <div className="h-svh w-full">
            <MobileMenu mobileMenu={mobileMenu} />
            <Header />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div className='flex w-full md:flex-row flex-col-reverse gap-4 md:gap-0 default-font' onClick={() => setMobileMenu('hidden')}>
                <Sidebar />
                <div className='flex flex-col gap-4 lg:w-1/2'>
                    <CoverAndProfilePicture from={from} hideLocation={hideLocation} hideBirthday={hideBirthday} apiData={apiData} />
                    <ProfilePosts apiData={apiData} postAlert={postAlert} />
                </div>
                <SearchBar />
            </div>
        </div>
    );
}

