import { useEffect, useState } from "react"
import { PostsType } from "../types"
import placeholder from '../assets/profile.jpg'
import { Link } from "react-router-dom"
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";


interface postType {
    refreshFeed: boolean
}
export default function Posts(props: postType) {
    const [postData, setPostData] = useState<PostsType>()
    const [apiData, setApiData] = useState<any>()

    useEffect(() => {
        fetch('http://localhost:3000/api/posts')
            .then(res => res.json())
            .then(response => setPostData(response))
            .catch(err => console.error(err))
    }, [props.refreshFeed])

    async function likePost(id: string) {
        console.log('clicked')
        const data = {
            postId: id
        }
        await fetch(`http://localhost:3000/api/posts/likePost`, {
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
                    setApiData(jsonData)
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.error(err))
    }
    console.log(apiData)
    return (
        <div className="flex flex-col mx-2 gap-4 max-h-full overflow-auto">
            {postData && postData.map((content, index) => {
                return <div className="flex flex-col justify-center gap-4 text-lg" key={index}>
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
                        <div className="flex">
                            <IoMdHeartEmpty onClick={() => likePost(content._id)} />
                            <p className="text-right text-xs">{content.createdAt}</p>
                        </div>
                    </div>
                    <div className="h-[1px] bg-book-green"></div>
                </div>
            })}
        </div>
    )
}