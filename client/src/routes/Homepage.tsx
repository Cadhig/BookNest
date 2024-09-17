import { useState, useEffect } from "react"
import MobileHeader from "../components/MobileHeader"
import RightSidebar from "../components/RightSidebar"
import MobileMenu from "../components/MobileMenu"
import CreatePost from "../components/CreatePost"
import Sidebar from "../components/Sidebar"
import Posts from "../components/Posts"
import { User } from "../types";
import { PostsType } from "../types"


export default function Homepage() {
    const [mobileMenu, setMobileMenu] = useState<string>('hidden')
    const [refreshFeed, setRefreshFeed] = useState<boolean>(false)
    const [globalBar, setGlobalBar] = useState<string>("bg-book-green rounded-full w-1/4 h-[2px]")
    const [globalText, setGlobalText] = useState<string>("w-1/2 flex flex-col items-center text-xl font-bold")
    const [followingBar, setFollowingbar] = useState<string>('hidden')
    const [followingText, setFollowingText] = useState<string>("w-1/2 flex flex-col items-center text-xl text-book-dark/60")
    const [postData, setPostData] = useState<PostsType | any>()
    const [userData, setUserData] = useState<User | any>()
    const [refreshPost, setRefreshPost] = useState<User | any>()
    const [likedPostData, setLikedPostData] = useState<any>()
    const [feedType, setFeedType] = useState<string>('global')
    const [postAlert, setPostAlert] = useState<string>('hidden')

    useEffect(() => {
        fetchLoggedInUser()
    }, [refreshFeed, refreshPost, likedPostData, globalBar, followingBar])

    async function fetchLoggedInUser() {
        const loggedInUser = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/loggedInUser`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        const loggedInUserParsed = await loggedInUser.json()
        setUserData(loggedInUserParsed)
        if (feedType === 'global') {
            showGlobal()
        } else {
            showFollowing()
        }
    }

    function toggleMobileMenu(val: boolean) {
        if (val) {
            setMobileMenu("mobileMenuStyles w3-animate-left")
        } else {
            setMobileMenu('hidden')
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
        setGlobalText('w-1/2 flex flex-col items-center text-xl font-bold')
        setGlobalBar('bg-book-green rounded-full w-1/4 h-[2px]')
        setFollowingbar('hidden')
        setFollowingText('w-1/2 flex flex-col items-center text-xl text-book-dark/60')
        const globalPosts = await fetch(`${import.meta.env.VITE_API_ROUTE}/api/posts`)
        const globalPostsParsed = await globalPosts.json()
        setPostData(globalPostsParsed)
        if (globalPostsParsed.length == 0) {
            setPostAlert('inline text-lg text-black/50 text-center')
        } else {
            setPostAlert('hidden')
        }
    }

    async function showFollowing() {
        setFeedType('following')
        setGlobalText('w-1/2 flex flex-col items-center text-xl text-book-dark/60')
        setGlobalBar('hidden')
        setFollowingbar('bg-book-green rounded-full w-1/4 h-[2px]')
        setFollowingText('w-1/2 flex flex-col items-center text-xl font-bold')
        const followingPosts = userData[0].followingPosts
        if (followingPosts.length == 0) {
            setPostAlert('inline text-lg text-black/50 text-center')
        } else {
            setPostAlert('hidden')
        }
        setPostData(followingPosts)
    }

    if (!postData && !userData) {
        return null
    }

    return (
        <div className="h-svh default-font text-book-dark">
            <MobileMenu mobileMenu={mobileMenu} />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div onClick={() => toggleMobileMenu(false)} className="flex flex-col lg:flex-row-reverse">
                <RightSidebar />
                <div className="flex flex-col lg:w-1/2 w-full max-h-full">
                    <div className="flex my-4">
                        <div className={globalText} onClick={() => switchFeedType('global')}>
                            <button>Global</button>
                            <div className={globalBar}></div>
                        </div>
                        <div className={followingText} onClick={() => switchFeedType('following')}>
                            <button>Following</button>
                            <div className={followingBar}></div>
                        </div>
                    </div>
                    <CreatePost setRefreshFeed={setRefreshFeed} refreshFeed={refreshFeed} userData={userData} />
                    <Posts postAlert={postAlert} refreshFeed={refreshFeed} likedPostData={likedPostData} userData={userData} refreshPost={refreshPost} setLikedPostData={setLikedPostData} postData={postData} setRefreshPost={setRefreshPost} />
                </div>
                <Sidebar />
            </div>
        </div>
    )
}