"use client"
import Button from "@/components/layoutComponents/Button"
import {useRouter} from 'next/navigation'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import './styles.css';

// import required modules
import { EffectCards } from 'swiper/modules';
import Link from "next/link";
import Footer from "@/components/layoutComponents/Footer";


export default function Page() {
  const router = useRouter()


  const gotoEventProfile = (e:any,id:any)=>{
    router.push(`/party/${id}`)
  }

  return (
    <div>
        <main className="w-full overflow-x-clip">
          <nav className="flex flex-row bg-black p-4 container mx-auto items-center justify-between">
            <div className="text-white text-2xl font-bold">
                <span className="text-yellow-400">Event</span>Hive
            </div>
            <div>
                <img className= "rounded-[50%]" src="https://avatars.githubusercontent.com/u/81812611?v=4" alt='profile-photo' height={50} width={50}/>
            </div>
          </nav>
          
          <div className="event-filters">
            <section>
              <div className="flex items-center justify-between p-4">
                <Button text={"Events"} color = {"black"} onClick = {()=>{router.push('/find-event')}}/>
                <Button text={"Deals"} color = {"yellow-400 text-black"} onClick = {()=>{router.push('/deals')}}/>
              </div>
            </section>
          </div>
          <div className="h-auto">
            <section className="flex items-center justify-center">
              <div className="relative h-[33rem] w-[20rem] cards-container  bg-white p-2">
                

                <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide onClick={(e)=>gotoEventProfile(e,"item.?id")} className=""><div className="event-image">
              <div className="flex flex-col items-center h-fit justify-between">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={420} 
                      width={320}
                      className="bg-red-400"
                  />
                </div>
                <div className="event-description flex flex-col items-center ">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div>
                </div>
                </SwiperSlide>
            <SwiperSlide><div className="event-image">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={420} 
                      width={320}
                      className="bg-red-400"
                  />
                </div>
                <div className="event-description flex flex-col items-center justify-center h-full">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div></SwiperSlide>
            <SwiperSlide><div className="event-image">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={420} 
                      width={320}
                      className="bg-red-400"
                  />
                </div>
                <div className="event-description flex flex-col items-center">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold text-black">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div></SwiperSlide>
            <SwiperSlide><div className="event-image">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={420} 
                      width={320}
                      className="bg-red-400"
                  />
                </div>
                <div className="event-description flex flex-col items-center">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div></SwiperSlide>
            <SwiperSlide><div className="event-image">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={420} 
                      width={320}
                  />
                </div>
                <div className="event-description flex flex-col items-center">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div></SwiperSlide>
            <SwiperSlide><div className="event-image">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={420} 
                      width={320}
                  />
                </div>
                <div className="event-description flex flex-col items-center">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div></SwiperSlide>
            <SwiperSlide><div className="event-image">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={420} 
                      width={320}
                  />
                </div>
                <div className="event-description flex flex-col items-center">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div></SwiperSlide>
            <SwiperSlide><div className="event-image">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={500} 
                      width={320}
                  />
                </div>
                <div className="event-description flex flex-col items-center">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div></SwiperSlide>
            <SwiperSlide><div className="event-image">
                  <img src="https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg" 
                      alt="event-image" 
                      height={420} 
                      width={320}
                      className="bg-red-400"
                  />
                </div>
                <div className="event-description flex flex-col items-center">
                  <h2 className="font-extrabold text-3xl">Docked</h2>
                  <div className="details">
                    <span className="text-sm font-bold">sat, 21 oct@4:20PM</span>
                  </div>
                  <div>
                    <div>

                    </div>
                  </div>
                </div></SwiperSlide>
          </Swiper>  
              </div>
            </section>
          </div>

          <section className="pt-5">
            <div className="flex items-center justify-between p-4 font-bold text-white">
              <p>Discover Events</p>
              <Link href={'/show-all'}>show all</Link>
            </div>
            <div className="discover-cards flex flex-col space-y-2 p-4 bg-black font-bold">
              <div className="relative border-2 border-black">
                <img src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg" alt="banner-img" className="w-full h-auto"/>
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">Parties</div>
              </div>
              <div className="relative border border-black">
                <img src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg" alt="banner-img" className="w-full h-auto"/>
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">Parties</div>
              </div>
              <div className="relative border border-black">
                <img src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg" alt="banner-img" className="w-full h-auto"/>
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">Parties</div>
              </div>
              <div className="relative border border-black">
                <img src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg" alt="banner-img" className="w-full h-auto"/>
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">Parties</div>
              </div>
            </div>
          </section>
        </main>
        <Footer/>
    </div>
  )
}
