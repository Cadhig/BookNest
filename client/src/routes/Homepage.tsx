import { useState, useEffect } from "react"
import MobileHeader from "../components/MobileHeader"
import SearchBar from "../components/SearchBar"
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
    const [postData, setPostData] = useState<PostsType>()
    const [userData, setUserData] = useState<User | any>()
    const [refreshPost, setRefreshPost] = useState<User | any>()
    const [likedPostData, setLikedPostData] = useState<any>()

    async function fetchLoggedInUser() {
        await fetch('http://localhost:3000/api/user/loggedInUser', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(response => setUserData(response))
            .catch(err => console.error(err))
        await fetch('http://localhost:3000/api/posts')
            .then(res => res.json())
            .then(response => setPostData(response))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        fetchLoggedInUser()
    }, [refreshFeed, refreshPost, likedPostData])

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

    function showGlobal() {
        setGlobalText('w-1/2 flex flex-col items-center text-xl font-bold')
        setGlobalBar('bg-book-green rounded-full w-1/4 h-[2px]')
        setFollowingbar('hidden')
        setFollowingText('w-1/2 flex flex-col items-center text-xl text-book-dark/60')
    }

    function showFollowing() {
        setGlobalText('w-1/2 flex flex-col items-center text-xl text-book-dark/60')
        setGlobalBar('hidden')
        setFollowingbar('bg-book-green rounded-full w-1/4 h-[2px]')
        setFollowingText('w-1/2 flex flex-col items-center text-xl font-bold')
    }

    if (!postData && !userData) {
        return null
    }

    return (
        <div className="h-svh default-font text-book-dark">
            <MobileMenu mobileMenu={mobileMenu} />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div onClick={() => toggleMobileMenu(false)} className="flex flex-col md:flex-row-reverse">
                <SearchBar />
                <div className="flex flex-col md:w-1/2 w-full max-h-full">
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
                    <CreatePost setRefreshFeed={setRefreshFeed} refreshFeed={refreshFeed} />
                    <Posts postAlert="hidden" refreshFeed={refreshFeed} likedPostData={likedPostData} userData={userData} refreshPost={refreshPost} setLikedPostData={setLikedPostData} postData={postData} setRefreshPost={setRefreshPost} />
                </div>
                <Sidebar />
            </div>
        </div>
    )
}