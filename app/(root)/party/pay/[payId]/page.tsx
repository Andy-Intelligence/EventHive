import { getCurrentUser } from "@/utils/getUserDetails";
import Pay from "./Pay"


const page = async ({params}:any) => {
  console.log(" am ",params.payId)
  const userDetails = await getCurrentUser();
  console.log("mm", userDetails);
  const plainUserDetails = userDetails
    ? JSON.parse(JSON.stringify(userDetails))
    : null;

   const pk =  process?.env?.PAYSTACK_KEYS as string

  return (
    <div><Pay params={params.payId} user={plainUserDetails} paystack_key={pk}/></div>
  )
}

export default page