import { BiImage } from 'react-icons/bi'
import profile from '../assets/profile.jpg'
import { useState } from 'react'

interface postType {
    refreshFeed: boolean,
    setRefreshFeed: (value: boolean) => void
}
export default function CreatePost(props: postType) {
    const [postText, setPostText] = useState<string>()
    async function sendPost() {
        const data = {
            postText: postText
        }
        await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((response) => {
                props.setRefreshFeed(!props.refreshFeed)
                console.log(response)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className="p-2 flex flex-col gap-2 mt-4 md:mt-0">
            <div className='flex gap-2 justify-center items-center'>
                <img src={profile} alt="" className='w-16 rounded-full object-cover' />
                <input type="text" placeholder='What are you reading...' className='border border-book-green w-full rounded-full h-10 p-2' onChange={(e) => setPostText(e.target.value)} />
            </div>
            <div className='flex justify-between items-center'>
                <BiImage className='text-3xl text-book-dark ml-4' />
                <button className='bg-book-green text-book-light px-4 py-2 rounded-full hover:bg-book-green-hover' onClick={sendPost}>Post</button>
            </div>
        </div>
    )
}