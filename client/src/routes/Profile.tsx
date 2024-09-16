import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MobileMenu from "../components/MobileMenu"
import MobileHeader from "../components/MobileHeader"
import Sidebar from "../components/Sidebar"
import RightSidebar from "../components/RightSidebar"
import CoverAndProfilePicture from "../components/CoverAndProfilePicture"
import { PostsType } from "../types"
import Posts from "../components/Posts"
import { User } from "../types"



export default function Profile() {
    const location = useLocation()
    const { from } = location.state
    const [userData, setUserData] = useState<any>()
    const [mobileMenu, setMobileMenu] = useState<string>('hidden')
    const [hideLocation, setHideLocation] = useState<string>('flex gap-2 items-center')
    const [hideBirthday, setHideBirthday] = useState<string>('flex gap-2 items-center')
    const [postAlert, setPostAlert] = useState<string>('hidden')
    const [postsBar, setPostsBar] = useState<string>("bg-book-green rounded-full w-1/4 h-[2px]")
    const [postsText, setPostsText] = useState<string>("w-1/2 flex flex-col items-center text-xl font-bold")
    const [likesBar, setLikesbar] = useState<string>('hidden')
    const [postData, setPostData] = useState<PostsType>()
    const [likesText, setLikesText] = useState<string>("w-1/2 flex flex-col items-center text-xl text-book-dark/60")
    const [refreshPost, setRefreshPost] = useState<User | any>()
    const [likedPostData, setLikedPostData] = useState<any>()
    const [feedType, setFeedType] = useState<string>('posts')

    useEffect(() => {
        fetchData()
    }, [from, refreshPost, likedPostData, feedType])

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
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/user/profile`, {
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
                    setUserData(jsonData)
                    if (!jsonData[0].location) {
                        setHideLocation('hidden')
                    }
                    if (!jsonData[0].birthday) {
                        setHideBirthday('hidden')
                    }
                    if (jsonData[0].posts.length < 1) {
                        setPostAlert('inline text-lg text-black/50 text-center')
                    }
                    if (feedType === 'posts') {
                        setPostData(jsonData[0].posts)
                    }
                    if (feedType === 'likes') {
                        setPostData(jsonData[0].likes)
                    }
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }


    function switchFeedType(feedType: string) {
        if (feedType === 'posts') {
            showPosts()
        } else {
            showLikes()
        }
    }

    function showPosts() {
        setFeedType('posts')
        setPostsText('w-1/2 flex flex-col items-center text-xl font-bold')
        setPostsBar('bg-book-green rounded-full w-1/4 h-[2px]')
        setLikesbar('hidden')
        setLikesText('w-1/2 flex flex-col items-center text-xl text-book-dark/60')
    }

    function showLikes() {
        setFeedType('likes')
        setPostsText('w-1/2 flex flex-col items-center text-xl text-book-dark/60')
        setPostsBar('hidden')
        setLikesbar('bg-book-green rounded-full w-1/4 h-[2px]')
        setLikesText('w-1/2 flex flex-col items-center text-xl font-bold')
    }


    async function followUser() {
        console.log(userData[0]._id)
        const data = {
            userId: userData[0]._id
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
                }
            })
    }

    if (!postData && !userData) {
        return null
    }

    return (
        <div className="h-svh w-full">
            <MobileMenu mobileMenu={mobileMenu} />
            <MobileHeader toggleMobileMenu={toggleMobileMenu} />
            <div className='flex w-full lg:flex-row flex-col-reverse gap-4 lg:gap-0 default-font' onClick={() => setMobileMenu('hidden')}>
                <Sidebar />
                <div className='flex flex-col gap-4 lg:w-1/2'>
                    <CoverAndProfilePicture followUser={followUser} from={from} hideLocation={hideLocation} hideBirthday={hideBirthday} userData={userData} />
                    <div className="flex my-4">
                        <div className={postsText} onClick={() => switchFeedType('posts')}>
                            <button>Posts</button>
                            <div className={postsBar}></div>
                        </div>
                        <div className={likesText} onClick={() => switchFeedType('likes')}>
                            <button>Likes</button>
                            <div className={likesBar}></div>
                        </div>
                    </div>
                    <Posts postAlert={postAlert} likedPostData={likedPostData} userData={userData} refreshPost={refreshPost} setLikedPostData={setLikedPostData} postData={postData} setRefreshPost={setRefreshPost} />
                </div>
                <RightSidebar />
            </div>
        </div>
    );
}

