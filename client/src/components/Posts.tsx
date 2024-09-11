import placeholder from '../assets/profile.jpg'
import { Link } from "react-router-dom"
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { User } from "../types";
import { Post } from "../types"
import moment from 'moment';

interface postProps {
    postData: any
    likedPostData: any,
    refreshPost: User | any,
    setRefreshPost: (props: boolean) => void
    setLikedPostData: (props: any) => void,
    userData: User | any,
    refreshFeed?: boolean
    postAlert?: string
}
export default function Posts(props: postProps) {
    function likeOrUnlikePost(id: string, hasUserLiked: any) {
        if (hasUserLiked) {
            unlikePost(id)
        } else {
            likePost(id)
        }
        props.setRefreshPost(!props.refreshPost)
    }

    async function unlikePost(id: string) {
        const data = {
            postId: id
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/posts/unlikePost`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then(async (res) => {
                if (res.ok) {
                    const jsonData = await res.json()
                    props.setLikedPostData(jsonData)
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }

    async function likePost(id: string) {
        const data = {
            postId: id
        }
        await fetch(`${import.meta.env.VITE_API_ROUTE}/api/posts/likePost`, {
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
                    props.setLikedPostData(jsonData)
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }


    return (
        <div className="flex flex-col m-2 gap-4 max-h-full overflow-auto">
            {props.postData && props.postData.map((content: Post, index: number) => {
                const userId = props.userData && props.userData[0]._id
                const hasUserLiked = content.likes.some((like: string) => like === userId);
                return <div className="flex flex-col justify-center gap-4 text-lg" key={index}>
                    <p className={props.postAlert}>No posts yet!</p>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 ">
                            <div className="flex gap-2 items-center">
                                <Link to={'/profile'} state={{ from: content.username }}>
                                    <img src={placeholder} alt="" className="h-10 rounded-full" />
                                </Link>
                                <div className="flex flex-col">
                                    <Link to={'/profile'} state={{ from: content.username }}>
                                        <p className="hover:underline cursor-pointer font-bold">@{content.username}</p>
                                    </Link>
                                </div>
                            </div>
                            <p className="text-ellipsis">{content.postText}</p>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <div className='flex items-center gap-1'>
                                <p onClick={() => likeOrUnlikePost(content._id, hasUserLiked)}>{hasUserLiked ? <IoHeart /> : <IoMdHeartEmpty />}</p>
                                <p>{content.likes.length}</p>
                            </div>
                            <p className="text-right text-xs">{moment(content.createdAt).startOf('second').fromNow()}</p>
                        </div>
                    </div>
                    <div className="h-[1px] bg-book-green"></div>
                </div>
            })}
        </div>
    )
}