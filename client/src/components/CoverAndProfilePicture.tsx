import { BsEnvelopeFill } from 'react-icons/bs'
import { IoBookmarks } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import profile from '../assets/profile.jpg'
import backdrop from '../assets/backdrop.jpg'
import { FaCakeCandles, FaLocationDot, FaCalendarDays } from "react-icons/fa6";

import { Link } from 'react-router-dom'
import moment from 'moment'

interface ProfileUser {
    from: string
    userData: any,
    hideLocation: string,
    hideBirthday: string,
    refresh: boolean,
    setRefresh: (arg: boolean) => void
}

export default function CoverAndProfilePicture(props: ProfileUser) {
    const [showInteractionButtons, setShowInteractionButtons] = useState<string>('hidden')
    const [followButton, setFollowButton] = useState<string>('Follow')

    useEffect(() => {
        if (props.userData[1].isLoggedInUserFollowing) {
            setFollowButton('Unfollow')
        }
        if (!props.userData[1].isLoggedInUserFollowing) {
            setFollowButton('Follow')
        }
        if (props.from === 'user') {
            setShowInteractionButtons('hidden')
        } else {
            setShowInteractionButtons('w-full flex justify-end p-4 gap-4')
        }

    }, [props.from, followButton, followOrUnfollowUser])

    async function followUser() {
        const data = {
            userId: props.userData[0].user[0]._id
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/follow`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then(async (res) => {
                if (res.ok) {
                    console.log(res)
                    setFollowButton('Unfollow')
                    props.setRefresh(!props.refresh)
                }
            })
    }

    async function unfollowUser() {
        const data = {
            userId: props.userData[0].user[0]._id
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/unfollow`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then(async (res) => {
                if (res.ok) {
                    console.log(res)
                    setFollowButton('Follow')
                    props.setRefresh(!props.refresh)
                }
            })
    }

    function followOrUnfollowUser() {
        if (props.userData[1].isLoggedInUserFollowing) {
            setFollowButton('Follow')
            unfollowUser()
        } else {
            setFollowButton('Unfollow')
            followUser()
        }
    }

    return (
        <div>
            <div className='relative h-80 defaultFont'>
                <img src={backdrop} alt="cover" className=' h-64 w-full object-cover mx-auto z-10' />
                <div className='rounded-full size-28 z-20 flex absolute items-center justify-center  left-6 lg:left-[6%] top-48 border-2 border-book-green'>
                    <img src={profile} alt="profile" className='rounded-full size-24' />
                </div>
                <div className={showInteractionButtons}>
                    <Link to={'/bookmarks'} state={{ from: props.userData[0].user && props.userData[0].user[0].username }}>
                        <div className="bg-book-green flex cursor-pointer hover:bg-book-green-hover items-center rounded-full p-2">
                            <IoBookmarks className="text-2xl text-book-light" />
                        </div>
                    </Link>
                    <div className="bg-book-green cursor-pointer hover:bg-book-green-hover flex items-center rounded-full p-2">
                        <BsEnvelopeFill className="text-2xl text-book-light" />
                    </div>
                    <button className='bg-book-green text-book-light py-2 px-5 rounded-full hover:bg-book-green-hover' onClick={() => followOrUnfollowUser()}>{followButton}</button>
                </div>
            </div>
            <div className='ml-6 flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <p className='font-bold text-xl'>{props.userData[0].user && props.userData[0].user[0].username}</p>
                </div>
                <p>{props.userData[0].user && props.userData[0].user[0].bio}</p>
                <div className="flex gap-4 text-black/60">
                    <div className={props.hideLocation}>
                        <FaLocationDot />
                        <p>{props.userData[0].user && props.userData[0].user[0].location}</p>
                    </div>
                    <div className={props.hideBirthday}>
                        <FaCakeCandles />
                        <p>{props.userData[0].user && props.userData[0].user[0].birthday}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <FaCalendarDays />
                        <p>Joined {moment(props.userData[0].user[0].createdAt).format("MMM YYYY")}</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex gap-1'>
                        <p>{props.userData[0].user[0].followers.length}</p>
                        <p className='text-black/60'>Followers</p>
                    </div>
                    <div className='flex gap-1'>
                        <p>{props.userData[0].user[0].following.length}</p>
                        <p className='text-black/60'>Following</p>
                    </div>
                </div>
            </div>
        </div>
    );
}