import { IoBookmarks } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { FaCakeCandles, FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import moment from 'moment'

interface ProfileUser {
    from: string
    userData: any,
    showLocation: boolean,
    showBirthday: boolean,
    followButton: boolean,
    setFollowButton: (arg: boolean) => void
}

export default function CoverAndProfilePicture(props: ProfileUser) {
    const [followButton, setFollowButton] = useState<"Follow" | "Unfollow">('Follow')

    useEffect(() => {
        if (props.userData[1].isLoggedInUserFollowing) {
            setFollowButton('Unfollow')
        }
        if (!props.userData[1].isLoggedInUserFollowing) {
            setFollowButton('Follow')
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
                    props.setFollowButton(!props.followButton)
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
                    props.setFollowButton(!props.followButton)
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
                <img src={props.userData[0].user[0].coverPicture && props.userData[0].user[0].coverPicture} alt="cover" className=' h-64 w-full object-cover mx-auto z-10' />
                <div className='centered rounded-full size-28 z-20 absolute left-6 lg:left-[6%] top-48 border-2 border-book-green'>
                    <img src={props.userData[0].user[0].profilePicture && props.userData[0].user[0].profilePicture} alt="profile" className='rounded-full object-cover size-24' />
                </div>
                <div className="w-full flex justify-end p-4 gap-4">
                    <Link to={'/bookmarks'} state={{ from: props.userData[0].user && props.userData[0].user[0].username }}>
                        <div className="flex cursor-pointer items-center rounded-full p-2 button-colors">
                            <IoBookmarks className="text-2xl text-book-light" />
                        </div>
                    </Link>
                    <button className='py-2 px-4 rounded-full button-colors' onClick={() => followOrUnfollowUser()}>{followButton}</button>
                </div>
            </div>
            <div className='ml-6 flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <p className='font-bold text-xl'>{props.userData[0].user && props.userData[0].user[0].username}</p>
                </div>
                <div className='text-lg'>{props.userData[0].user && props.userData[0].user[0].bio}</div>
                <div className="flex gap-4 text-black/60">
                    <div className={props.showLocation ? "flex gap-2 items-center" : "hidden"}>
                        <FaLocationDot />
                        <p>{props.userData[0].user && props.userData[0].user[0].location}</p>
                    </div>
                    <div className={props.showBirthday ? "flex gap-2 items-center" : "hidden"}>
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