"use client"
import Button from '@/components/layoutComponents/Button'
import {useRouter} from 'next/navigation'

export default function Page() {
    const router = useRouter()
    return (
      <div className='p-2 flex flex-col space-y-8 font-poppins items-center justify-center'>
            <section>
                <img className='h-[500px] w-full' src='https://psdfreebies.com/wp-content/uploads/2021/08/Weekend-Party-Event-Flyer-PSD-Preview-734x1024.jpg' alt='event-thumbnail'/> 
            </section>
            <section className='bg-white border border-black w-full flex flex-col p-4'>
                <div>
                    <h1 className='font-extrabold text-2xl'>
                        Sand Scream
                    </h1>
                    <p className='text-sm'>
                        Thursday, 7pm
                    </p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Details
                    </h3>
                    <p>26/10/2023, Thursday, 7:00PM</p>
                    <p>Beach Vibes /category/</p>
                </div>
                
                <div>
                    <h3 className=' font-bold'>
                        Location
                    </h3>
                    <p>Abak road, aks uyo</p>
                </div>

                <div>
                    <h3 className=' font-bold'>
                        Description / About
                    </h3>
                    <p>This event consist of 10000 pakfs jfks that are going to whaegesdfe twj fs ots f soaj do lrwlkfsl kls fjls</p>
                </div>

                <div>
                    <h3 className=' font-bold'>
                        Entertainments
                    </h3>
                    <p>food,drinks,alcohol</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Topic
                    </h3>
                    <p>Harnessing the power of AI</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Time
                    </h3>
                    <p>3:00PM-5:00PM</p>
                </div>


                <div>
                    <h3 className=' font-bold'>
                        Guest Artist
                    </h3>
                    <p>Davido, Wizkid, Olamide</p>
                </div>

                <div>
                    <h3 className=' font-bold'>
                        Gate Fee
                    </h3>
                    <p>#10,000</p>
                </div>

                <div>
                    <h3 className=' font-bold'>
                        Gender Requirement
                    </h3>
                    <p>Male</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Age Requirement
                    </h3>
                    <p>20 years and above</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Timeline
                    </h3>
                    <p>introduction</p>
                    <p>Prayers</p>
                    <p>congratulations</p>
                    <p>closing</p>
                </div>
                


                <div>
                    <h3 className=' font-bold'>
                    Event Website
                    </h3>
                    <a href='www.naso.com/event'>www.naso.com/event</a>
                </div>
                
                <div>
                    <h3 className=' font-bold'>
                        Event Category
                    </h3>
                    <p>Recreational</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Organisers
                    </h3>
                    <p>GAF</p>
                    <p>Sterling bank</p>
                    <p>eni stores</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Sponsors
                    </h3>
                    <p>Imikan store</p>
                    <p>pericle bank</p>
                    <p>melli</p>
                </div>
                


                <div>
                    <h3 className=' font-bold'>
                        Event Verification
                    </h3>
                    <p>verified</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Dressing Code
                    </h3>
                    <p>All white</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event ID
                    </h3>
                    <p>2jmmne29en2i4e2i4</p>
                </div>
                
                <div>
                    <h3 className=' font-bold'>
                        Event Attendance Count
                    </h3>
                    <p>879 people attending</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Maximum Attendance Needed
                    </h3>
                    <p>1000 vacancy, 121 people left</p>
                </div>
                
                <div>
                    <h3 className=' font-bold'>
                        Event Enquiry Phone No.
                    </h3>
                    <p>09087388377838</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Interactive map to find event
                    </h3>
                    <p>I am the map</p> 
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Ticket
                    </h3>
                    <p>The Good Beach /location/</p>
                    <p>#4,500</p>
                </div>
                
                
                <div>
                    <h3 className=' font-bold'>
                        Party Activities
                    </h3>
                    <p>activites</p>
                    <p>activities</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Description and Tips
                    </h3>
                    <p>activites</p>
                    <p>activities</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Comments and Reviews Section
                    </h3>
                    <p>This is the comment section</p>
                </div>
                

                <div>
                    <h3 className=' font-bold'>
                        Event Enquiry Phone No.
                    </h3>
                    <p>09087388377838</p>
                </div>
                


                <div className='flex flex-row items-center justify-center'>
                    <Button text={"Share"} color = {"black"} onClick = {()=>{router.push('/share')}}/>
                    <Button text={"Share"} color = {"black"} onClick = {()=>{router.push('/share')}}/>
                </div>

            </section>
            <section className='flex flex-col items-center justify-center space-y-2 pb-4'>
                <div className='text-sm font-bold'>TICKET PRICES ARE INCLUSIVE OF EventHive FEES</div>
                <div className='text-sm'>be part of an event without hesitating</div>
                <Button text={"Get Ticket"} color = {"black rounded-[10px]"} onClick = {()=>{router.push('/find-event')}}/>
            </section>
      </div>)
      }