
import { Link } from "react-router-dom"
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { postProps } from "../../types";
import moment from 'moment';

export default function Posts(props: postProps) {

    function likeOrUnlikePost(id: string, hasUserLiked: boolean) {
        if (hasUserLiked) {
            unlikePost(id)
        } else {
            likePost(id)
        }
        props.setRefreshFeed(!props.refreshFeed)
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
    }

    return (
        <div className="flex flex-col m-2 gap-4 max-h-full">
            <p className={props.showPostAlert ? 'inline text-lg text-black/50 text-center' : 'hidden'}>No posts yet!</p>
            {props.postData && props.postData.map((content, index: number) => {
                const userId = props.userData && props.userData[0]._id
                const hasUserLiked = content.likes.some((like: any) => like === userId);
                return <div className="flex flex-col justify-center gap-4 text-lg" key={index}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 ">
                            <div className="flex gap-2 items-center">
                                <Link to={`/user/${content.username}`} state={{ from: content.username }}>
                                    <img src={content.profilePicture} alt="" className="size-12 object-cover rounded-full" />
                                </Link>
                                <div className="flex flex-col">
                                    <Link to={`/user/${content.username}`} state={{ from: content.username }}>
                                        <p className="hover:underline cursor-pointer font-bold text-xl">@{content.username}</p>
                                    </Link>
                                </div>
                            </div>
                            <p className="text-lg">{content.postText}</p>
                        </div>
                        <div className="flex gap-1 justify-between items-center">
                            <div className='flex items-center gap-1'>
                                <div onClick={() => likeOrUnlikePost(content._id, hasUserLiked)}>{hasUserLiked ? <IoHeart size={20} className="hoverFloat" /> : <IoMdHeartEmpty size={20} className="hoverFloat" />}</div>
                                <div>{content.likes.length}</div>
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