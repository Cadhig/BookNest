import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import profile from '../assets/profile.jpg'
import backdrop from '../assets/backdrop.jpg'
import Header from "../components/Header"
import MobileMenu from "../components/MobileMenu"
import MobileHeader from "../components/MobileHeader"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import { FaCakeCandles, FaLocationDot } from "react-icons/fa6";

export default function Profile() {
    const location = useLocation()
    const { from } = location.state
    const [apiData, setApiData] = useState<any>()
    const [mobileMenu, setMobileMenu] = useState('hidden')
    const [hideLocation, setHideLocation] = useState('flex gap-2 items-center')
    const [hideBirthday, setHideBirthday] = useState('flex gap-2 items-center')

    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("mobileMenuStyles w3-animate-left")
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
                    if (jsonData[0].location === undefined) {
                        setHideLocation('hidden')
                    }
                    if (jsonData[0].birthday === undefined) {
                        setHideBirthday('hidden')
                    }
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(apiData)

    return (
        <div className="h-svh w-full">
            <MobileMenu mobileMenu={mobileMenu} />
            <Header />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div className='flex w-full md:flex-row flex-col-reverse gap-4 md:gap-0 default-font' onClick={() => setMobileMenu('hidden')}>
                <Sidebar />
                <div className='flex flex-col gap-4 lg:w-1/2'>
                    <CoverAndProfilePicture from={from} />
                    <div className='ml-6 flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <p className='font-bold text-xl'>{apiData && apiData[0].username}</p>
                        </div>
                        <p>{apiData && apiData[0].bio}</p>
                        <div className="flex gap-4 text-black/60">
                            <div className={hideLocation}>
                                <FaLocationDot />
                                <p>{apiData && apiData[0].location}</p>
                            </div>
                            <div className={hideBirthday}>
                                <FaCakeCandles />
                                <p>{apiData && apiData[0].birthday}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <SearchBar />
            </div>
        </div>
    );
}


import { BsEnvelopeFill } from 'react-icons/bs'

interface ProfileUser {
    from: string
}

function CoverAndProfilePicture(props: ProfileUser) {
    const [showInteractionButtons, setShowInteractionButtons] = useState<string>('hidden')

    useEffect(() => {
        if (props.from === 'user') {
            setShowInteractionButtons('hidden')
        } else {
            setShowInteractionButtons('w-full flex justify-end p-4 gap-4')
        }
    }, [])

    // setTimeout(() => {
    //     setShowMessage(false);
    // }, 3000); 

    return (
        <div className='relative h-80 defaultFont'>
            <img src={backdrop} alt="cover" className='relative h-64 w-full object-cover mx-auto' />
            <div className='rounded-full size-28 flex items-center justify-center absolute left-6 lg:left-[6%] top-48 border-2 border-book-green'>
                <img src={profile} alt="profile" className='rounded-full size-24' />
            </div>
            <div className={showInteractionButtons}>
                <div className="bg-book-green flex items-center rounded-full p-2">
                    <BsEnvelopeFill className="text-2xl text-book-light" />
                </div>
                <button className='bg-book-green text-book-light py-2 px-5 rounded-full'>Follow</button>
            </div>
        </div>
    );
}