import Image from "next/image"
import newsImage from '../../../public/assets/newsImage.jpg'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface OffbeatEventProps{
    img:string;
    eventTitle:string;
    eventDate:string;
    eventLocation:string;
    eventDescription:string;
}


function OffbeatEvent({img,eventTitle,eventDate,eventLocation,eventDescription}:OffbeatEventProps) {
  return (
    <div className="focusNews h-auto w-[90dvw]  md:w-[580px] flex flex-col shadow-md  shadow-[rgba(34,34,34,0.1)] p-4 space-y-3 transition bg-white rounded-lg">
      <Image
        className="h-auto w-full"
        src={img}
        height={960}
        width={600}
        alt="news image"
      />
      <div className="flex align-middle justify-start items-center space-x-2  text-[13px]  text-center text-black">
        <div className=" text-priceTagOrange">
          <CalendarMonthIcon className="calendar" />
        </div>
        <div>{eventDate}</div>
      </div>

      <h3 className="text-buttonPurple font-bold text-lg">{eventTitle}</h3>
      <p className="whitespace-normal text-left break-all">
        {eventDescription.split(" ").slice(0, 20).join(" ")}{" "}
        {/* Display only the first 15 words */}
        {eventDescription.split(" ").length > 20 && "..."}{" "}
        {/* Add ellipsis if text is longer than 15 words */}
      </p>

      {/* <div className="bg-buttonPurple h-8 w-24 text-sm text-black text-center flex justify-center items-center">Read More</div> */}
    </div>
  );
}

export default OffbeatEvent