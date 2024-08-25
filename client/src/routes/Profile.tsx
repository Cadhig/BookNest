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
import { Post } from "../types"


export default function Profile() {
    const location = useLocation()
    const { from } = location.state
    const [apiData, setApiData] = useState<any>()
    const [mobileMenu, setMobileMenu] = useState<string>('hidden')
    const [hideLocation, setHideLocation] = useState<string>('flex gap-2 items-center')
    const [hideBirthday, setHideBirthday] = useState<string>('flex gap-2 items-center')
    const [postAlert, setPostAlert] = useState<string>('hidden')

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
                    if (jsonData[0].posts[0] === undefined) {
                        setPostAlert('inline text-lg text-black/50 text-center')
                    }
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        fetchData()
    }, [from])
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
                    <div className="flex flex-col mx-2 gap-4 max-h-full overflow-auto">
                        <p className={postAlert}>No posts yet!</p>
                        {apiData && apiData[0].posts.map((content: Post, index: number) => {
                            return <div className="flex flex-col justify-center gap-4" key={index}>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 ">
                                        <Link to={'/profile'} state={{ from: content.username }}>
                                            <img src={profile} alt="" className="h-10 rounded-full" />
                                        </Link>
                                        <div className="flex flex-col">
                                            <Link to={'/profile'} state={{ from: content.username }}>
                                                <p className="hover:underline cursor-pointer">@{content.username}</p>
                                            </Link>
                                            <p>{content.postText}</p>
                                        </div>
                                    </div>
                                    <p className="text-right text-xs">{content.createdAt}</p>
                                </div>
                                <div className="h-[1px] bg-book-green"></div>
                            </div>
                        })}
                    </div>
                </div>
                <SearchBar />
            </div>
        </div>
    );
}


import { BsEnvelopeFill } from 'react-icons/bs'
import { IoBookmarks } from 'react-icons/io5'

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
    }, [props.from])

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
                    <IoBookmarks className="text-2xl text-book-light" />
                </div>
                <div className="bg-book-green flex items-center rounded-full p-2">
                    <BsEnvelopeFill className="text-2xl text-book-light" />
                </div>
                <button className='bg-book-green text-book-light py-2 px-5 rounded-full'>Follow</button>
            </div>
        </div>
    );
}