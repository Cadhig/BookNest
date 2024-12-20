import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Post } from "../types"
import { User } from "../types"
import Posts from "../components/posting/Posts"
import MobileMenu from "../components/base/MobileMenu"
import MobileHeader from "../components/base/MobileHeader"
import Sidebar from "../components/base/Sidebar"
import RightSidebar from "../components/base/RightSidebar"
import CoverAndProfilePicture from "../components/CoverAndProfilePicture"
import Reviews from "../components/Reviews"

export default function Profile() {
    const {username} = useParams()
    const [userData, setUserData] = useState<any>()
    const [showLocation, setShowLocation] = useState<boolean>(true)
    const [showBirthday, setShowBirthday] = useState<boolean>(true)
    const [showPostAlert, setshowPostAlert] = useState<boolean>(false)
    const [postData, setPostData] = useState<Post[] | undefined>()
    const [refreshFeed, setRefreshFeed] = useState<User | any>()
    const [feedType, setFeedType] = useState<'posts' | 'likes' | 'reviews'>('posts')
    const [isFeedPosts, setIsFeedPosts] = useState<boolean>(true)
    const [followButton, setFollowButton] = useState<boolean>(false)

    useEffect(() => {
        fetchData()
    }, [username, refreshFeed, feedType, followButton])


    async function fetchData() {
        const data = {
            username: username
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
                    const user = await res.json()
                    setUserData(user)
                    if (!user[0].user[0].location) {
                        setShowLocation(false)
                    }
                    if (!user[0].user[0].birthday) {
                        setShowBirthday(false)
                    }
                    if (user[0].user[0].posts.length < 1) {
                        setshowPostAlert(true)
                    }
                    if (feedType === 'posts') {
                        setPostData(user[0].user[0].posts)
                        setIsFeedPosts(true)
                    }
                    if (feedType === 'likes') {
                        setPostData(user[0].user[0].likes)
                        setIsFeedPosts(true)
                    }
                    if (feedType === "reviews") {
                        setIsFeedPosts(false)
                    }
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }

    if (!postData && !userData) {
        return null
    }

    return (
        <div className="h-svh w-full">
            <MobileMenu />
            <div className='flex w-full lg:flex-row flex-col-reverse lg:gap-0 default-font h-full lg:h-screen gap-4 overflow-hidden'>
                <Sidebar />
                <div className='flex flex-col gap-4 lg:w-1/2 max-h-svh hideScrollbar overflow-auto'>
                    <CoverAndProfilePicture followButton={followButton} username={username} setFollowButton={setFollowButton} showLocation={showLocation} showBirthday={showBirthday} userData={userData} />
                    <div className="flex my-4">
                        <div className={feedType === 'posts' ? "w-1/2 flex flex-col items-center text-xl font-bold" : "w-1/2 flex flex-col items-center text-xl text-black/60 hoverFloat hover:text-black"} onClick={() => setFeedType('posts')}>
                            <button>Posts</button>
                            <div className={feedType === 'posts' ? "bg-book-green rounded-full w-1/4 h-[2px]" : 'hidden'}></div>
                        </div>
                        <div className={feedType === 'likes' ? "w-1/2 flex flex-col items-center text-xl font-bold" : "w-1/2 flex flex-col items-center text-xl text-black/60 hoverFloat hover:text-black"} onClick={() => setFeedType('likes')}>
                            <button>Likes</button>
                            <div className={feedType === 'likes' ? "bg-book-green rounded-full w-1/4 h-[2px]" : 'hidden'}></div>
                        </div>
                        <div className={feedType === 'reviews' ? "w-1/2 flex flex-col items-center text-xl font-bold" : "w-1/2 flex flex-col items-center text-xl text-black/60 hoverFloat hover:text-black"} onClick={() => setFeedType('reviews')}>
                            <button>Reviews</button>
                            <div className={feedType === 'reviews' ? "bg-book-green rounded-full w-1/4 h-[2px]" : 'hidden'}></div>
                        </div>
                    </div>
                    <div>
                        {isFeedPosts ? <Posts showPostAlert={showPostAlert} userData={userData && userData[0].user} refreshFeed={refreshFeed} postData={postData} setRefreshFeed={setRefreshFeed} /> : <Reviews isFromBookInfoPage={false} userReviews={userData && userData[0].user[0].reviews} />}
                    </div>
                </div>
                <RightSidebar />
                <MobileHeader />
            </div>
        </div>
    );
}

