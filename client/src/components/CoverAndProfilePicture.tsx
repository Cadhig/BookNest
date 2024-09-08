import { BsEnvelopeFill } from 'react-icons/bs'
import { IoBookmarks } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import profile from '../assets/profile.jpg'
import backdrop from '../assets/backdrop.jpg'
import { FaCakeCandles, FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom'

interface ProfileUser {
    from: string
    userData: any,
    hideLocation: string,
    hideBirthday: string
}

export default function CoverAndProfilePicture(props: ProfileUser) {
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
        <div>
            <div className='relative h-80 defaultFont'>
                <img src={backdrop} alt="cover" className=' h-64 w-full object-cover mx-auto z-10' />
                <div className='rounded-full size-28 z-20 flex absolute items-center justify-center  left-6 lg:left-[6%] top-48 border-2 border-book-green'>
                    <img src={profile} alt="profile" className='rounded-full size-24' />
                </div>
                <div className={showInteractionButtons}>
                    <Link to={'/bookmarks'} state={{ from: props.userData && props.userData[0].username }}>
                        <div className="bg-book-green flex cursor-pointer hover:bg-book-green-hover items-center rounded-full p-2">
                            <IoBookmarks className="text-2xl text-book-light" />
                        </div>
                    </Link>
                    <div className="bg-book-green cursor-pointer hover:bg-book-green-hover flex items-center rounded-full p-2">
                        <BsEnvelopeFill className="text-2xl text-book-light" />
                    </div>
                    <button className='bg-book-green text-book-light py-2 px-5 rounded-full hover:bg-book-green-hover'>Follow</button>
                </div>
            </div>
            <div className='ml-6 flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <p className='font-bold text-xl'>{props.userData && props.userData[0].username}</p>
                </div>
                <p>{props.userData && props.userData[0].bio}</p>
                <div className="flex gap-4 text-black/60">
                    <div className={props.hideLocation}>
                        <FaLocationDot />
                        <p>{props.userData && props.userData[0].location}</p>
                    </div>
                    <div className={props.hideBirthday}>
                        <FaCakeCandles />
                        <p>{props.userData && props.userData[0].birthday}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}