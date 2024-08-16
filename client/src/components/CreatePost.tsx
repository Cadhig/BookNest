import { BiImage } from 'react-icons/bi'
import profile from '../assets/profile.jpg'
export default function CreatePost() {

    return (
        <div className="p-2 flex flex-col gap-2 mt-4 md:mt-0">
            <div className='flex gap-2 justify-center items-center'>
                <img src={profile} alt="" className='w-16 rounded-full object-cover' />
                <input type="text" placeholder='What are you reading...' className='border border-book-green w-full rounded-full h-10 p-2' />
            </div>
            <div className='flex justify-between items-center'>
                <BiImage className='text-3xl text-book-dark ml-4' />
                <button className='bg-book-green text-book-light px-4 py-2 rounded-full'>Post</button>
            </div>
        </div>
    )
}