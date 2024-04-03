import CreateEvent from '@/components/forms/CreateEvent'
import React from 'react'
import { getCurrentUser } from "@/utils/getUserDetails";


const page = async () => {
  const userDetails = await getCurrentUser()
  const plainUserDetails = userDetails
    ? JSON.parse(JSON.stringify(userDetails))
    : null;
  console.log("crazy", userDetails);
  return (
    <div><CreateEvent user = {plainUserDetails}/></div>
  )
}

export default page