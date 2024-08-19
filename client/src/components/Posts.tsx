import { useEffect, useState } from "react"
import { PostsType } from "../types"
import placeholder from '../assets/profile.jpg'
import { Link } from "react-router-dom"

interface postType {
    refreshFeed: boolean
}
export default function Posts(props: postType) {
    const [postData, setPostData] = useState<PostsType>()

    useEffect(() => {
        fetch('http://localhost:3000/api/posts')
            .then(res => res.json())
            .then(response => setPostData(response))
            .catch(err => console.error(err))
    }, [props.refreshFeed])

    console.log(postData)

    return (
        <div className="flex flex-col mx-2 gap-4 max-h-full overflow-auto">
            {postData && postData.map((content, index) => {
                return <div className="flex flex-col justify-center gap-4" key={index}>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 ">
                            <Link to={'/profile'} state={{ from: content.username }}>
                                <img src={placeholder} alt="" className="h-10 rounded-full" />
                            </Link>
                            <div className="flex flex-col">
                                <Link to={'/profile'} state={{ from: content.username }}>
                                    <p className="hover:underline cursor-pointer">@{content.username}</p>
                                </Link>
                                <p>{content.postText}</p>
                            </div>
                        </div>
                        <p className="text-right text-xs">{content.createdAt}</p>
                    </div>
                    <div className="h-[1px] bg-book-green"></div>
                </div>
            })}
        </div>
    )
}