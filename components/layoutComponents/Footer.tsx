import React from 'react'
import {FaTwitter} from 'react-icons/fa'
import {BsInstagram} from 'react-icons/bs'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-black flex flex-col items-center justify-between p-4 font-bold text-white space-y-10'>
        <div className='flex flex-row items-center justify-between w-full px-2'>
            <div className='flex flex-col space-y-2'>
                <p>What's EventHive</p>
                <p>Help</p>
                <p>FAQ</p>
            </div>
            <div className='flex flex-col space-y-4'>
                <Link href={'/host-event'}>Host An Event</Link>
                <p>Parties</p>
                <p>Profile</p>
            </div>
        </div>
        <div className='socials flex flex-row items-center justify-center space-x-20 w-full'>
            <div>
                <FaTwitter size={24}/>
            </div>
            <div>
                <BsInstagram size={24}/>
            </div>
        </div>
        <div className='flex flex-row text-sm font-normal font-poppins justify-evenly w-full'>
            <div>HiveEvents</div>
            <div>Policy</div>
            <div>Terms</div> 
            <div>Blogs</div> 
        </div>
    </footer>
  )
}

export default Footer