// "use client"
// import React from 'react'
import BeAnEventHost from '@/components/BeAnEventHost'
import { getCurrentUser } from '@/utils/getUserDetails'
const page = async () => {
  const userDetails = await getCurrentUser()
  const plainUserDetails = userDetails
    ? JSON.parse(JSON.stringify(userDetails))
    : null;
  console.log("crazy",userDetails)
  return (



    <div><BeAnEventHost user = {plainUserDetails}/></div>
  )
}

export default page