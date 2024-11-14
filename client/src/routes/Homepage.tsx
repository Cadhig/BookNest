import { useState, useEffect } from "react"
import MobileHeader from "../components/base/MobileHeader"
import RightSidebar from "../components/base/RightSidebar"
import MobileMenu from "../components/base/MobileMenu"
import CreatePost from "../components/posting/CreatePost"
import Sidebar from "../components/base/Sidebar"
import Posts from "../components/posting/Posts"
import { User } from "../types";
import { PostsType } from "../types"


export default function Homepage() {
    const [refreshFeed, setRefreshFeed] = useState<boolean>(false)
    const [feedType, setFeedType] = useState<'global' | 'following'>('global')
    const [postData, setPostData] = useState<PostsType | any>()
    const [userData, setUserData] = useState<User | any>()
    const [showPostAlert, setshowPostAlert] = useState<boolean>(false)

    useEffect(() => {
        fetchLoggedInUser()
    }, [refreshFeed, feedType])

    async function fetchLoggedInUser() {
        const loggedInUserData = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/loggedInUser`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        const loggedInUser = await loggedInUserData.json()
        setUserData(loggedInUser)
        if (feedType === 'global') {
            showGlobal()
        } else {
            showFollowing()
        }
    }

    function switchFeedType(feedType: string) {
        if (feedType === 'global') {
            showGlobal()
        } else {
            showFollowing()
        }
    }

    async function showGlobal() {
        setFeedType('global')
        const globalPosts = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/posts`)
        const globalPostsParsed = await globalPosts.json()
        setPostData(globalPostsParsed)
        if (globalPostsParsed.length == 0) {
            setshowPostAlert(true)
        } else {
            setshowPostAlert(false)
        }
    }

    async function showFollowing() {
        setFeedType('following')
        const followingPosts = userData[0].followingPosts
        if (followingPosts.length == 0) {
            setshowPostAlert(true)
        } else {
            setshowPostAlert(false)
        }
        setPostData(followingPosts)
    }

    if (!postData && !userData) {
        return null
    }

    return (
        <div className="max-h-svh default-font">
            <MobileMenu />
            <div className="flex flex-col lg:flex-row-reverse justify-center h-screen gap-4 overflow-hidden">
                <MobileHeader />
                <RightSidebar />
                <div className="max-h-svh lg:w-1/2 overflow-auto hideScrollbar">
                    <div className="flex flex-col w-full ">
                        <div className="flex my-4">
                            <div className={feedType === "global" ? "w-1/2 flex flex-col items-center text-xl font-bold" : 'w-1/2 flex flex-col items-center text-xl text-black/60'} onClick={() => switchFeedType('global')}>
                                <button>Global</button>
                                <div className={feedType === "global" ? "bg-book-green rounded-full w-1/4 h-[2px]" : "hidden"}></div>
                            </div>
                            <div className={feedType === "following" ? "w-1/2 flex flex-col items-center text-xl font-bold" : 'w-1/2 flex flex-col items-center text-xl text-black/60'} onClick={() => switchFeedType('following')}>
                                <button>Following</button>
                                <div className={feedType === "following" ? 'bg-book-green rounded-full w-1/4 h-[2px]' : 'hidden'}></div>
                            </div>
                        </div>
                        <CreatePost setRefreshFeed={setRefreshFeed} refreshFeed={refreshFeed} userData={userData} />
                        <Posts showPostAlert={showPostAlert} refreshFeed={refreshFeed} setRefreshFeed={setRefreshFeed} userData={userData} postData={postData} />
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}