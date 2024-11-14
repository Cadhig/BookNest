import { BiImage } from 'react-icons/bi'
import { useState } from 'react'
import { Button } from "semantic-ui-react"

interface postType {
    userData: any
    refreshFeed: boolean,
    setRefreshFeed: (value: boolean) => void
}
export default function CreatePost(props: postType) {
    const [postText, setPostText] = useState<string>()
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleKeyDown(event: any) {
        if (event.key === 'Enter') {
            sendPost()
        }
    };


    async function sendPost() {
        setIsLoading(true)
        setTimeout(async () => {
            setIsLoading(false)
            const data = {
                postText: postText
            }
            await fetch(`${import.meta.env.VITE_API_ROUTE}/api/posts`, {
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
                    if (!response.ok) {
                        setShowError(true)
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        }, 2000)
    }


    return (
        <div className="p-2 flex flex-col gap-2 mt-4 lg:mt-0">
            <div className='gap-2 centered'>
                <img src={props.userData[0].profilePicture && props.userData[0].profilePicture} alt="" className='size-14 rounded-full object-cover' />
                <input onKeyDown={handleKeyDown} type="text" placeholder='What are you reading...' className='border border-book-green w-full rounded-full h-10 p-2' onChange={(e) => {
                    setPostText(e.target.value)
                    setShowError(false)
                }} />
            </div>
            <p className={showError ? 'text-right text-red-600' : 'hidden'}>Error: Maximum characters (300) exceeded</p>
            <div className='flex justify-between items-center'>
                <BiImage className='text-3xl ml-4' />
                {isLoading ? <Button className="button-colors rounded-full" loading>Signup</Button> : <button className=' button-colors px-9 py-3 rounded-full' onClick={sendPost}>Post</button>}

            </div>
        </div>
    )
}