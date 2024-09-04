import { Link } from "react-router-dom"
import profile from '../assets/profile.jpg'
import { Post } from "../types"
export default function ProfilePosts(props: any) {
    return (
        <div className="flex flex-col mx-2 gap-4 max-h-full overflow-auto default-font">
            <p className={props.postAlert}>No posts yet!</p>
            {props.apiData && props.apiData[0].posts.map((content: Post, index: number) => {
                return <div className="flex flex-col justify-center gap-4 text-lg" key={index}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 ">
                            <div className="flex items-center gap-2">
                                <Link to={'/profile'} state={{ from: content.username }}>
                                    <img src={profile} alt="" className="h-10 rounded-full" />
                                </Link>
                                <Link to={'/profile'} state={{ from: content.username }}>
                                    <p className="hover:underline cursor-pointer font-bold">@{content.username}</p>
                                </Link>
                            </div>
                            <p>{content.postText}</p>
                        </div>
                        <p className="text-right text-xs">{content.createdAt}</p>
                    </div>
                    <div className="h-[1px] bg-book-green"></div>
                </div>
            })}
        </div>
    )
}