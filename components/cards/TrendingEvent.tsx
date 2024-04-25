"use client"
import React from 'react'
import Image from "next/image"
// import newsImage from '../../../public/assets/unFocusNews.jpg'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IoLocationSharp } from 'react-icons/io5';

interface TrendingEventProps{
    img:string;
    eventTitle:string;
    eventDate:string;
    eventLocation:string;
}


function TrendingEvent({img,eventTitle,eventDate,eventLocation}:TrendingEventProps) {
  return (
    <div className='unFocusNews flex items-start justify-between  h-auto w-[90dvw] md:w-[580px] p-4 space-x-2 border-2 border-[rgba(34,34,34,0.1)] bg-white rounded-lg'>
        <div className='h-auto '>
        <Image   height={60} width={60}  
        src={img}
        alt={eventTitle}
        className="h-24 w-24 object-cover rounded-lg mr-4"
        style={{ minWidth: '100px' }} // Set a minimum width for the image
        
        />
        </div>
        <div className='flex flex-col h-24 w-full justify-between items-start'>

            <h4 className='text-lg font-bold text-buttonPurple'>{eventTitle}</h4>

            <div className='flex align-middle justify-start items-center space-x-2  text-[13px]  text-center text-black'>
                <div className=" text-priceTagOrange">
                    <CalendarMonthIcon  className='calendar text-[20px]'/>
                </div> 
                <div>
                  {eventDate}
                </div>
            </div>

            <div className='flex items-center justify-center space-x-2'>
            <div className='flex items-center justify-center'>

            <IoLocationSharp size={20} />
            </div>
            <p className='text-sm whitespace-normal text-left break-all w-full truncate ...'>{eventLocation}</p>
            </div>



        </div>
    </div>
  )
}

export default TrendingEvent