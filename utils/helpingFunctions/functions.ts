import { signIn } from "next-auth/react";



export default function isValidEmail(email: string): boolean {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

export function isStrongPassword(password: string): boolean {
  // Check if the password meets the following criteria:
  // - At least 8 characters long
  // - Contains at least one uppercase letter
  // - Contains at least one lowercase letter
  // - Contains at least one digit
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  return strongPasswordRegex.test(password);
}

export const handleGoogleSignIn = () => {
  signIn("google",{callbackUrl:"/find-event"});
};

export function nairaToKobo(valueInNaira: any) {
  return valueInNaira * 100;
}

// export const handlePayment = (email:any, amount:any) => {
//   const handler = PaystackPop.setup({
//     key: process.env.PAYSTACK_KEYS,
//     email,
//     amount: amount * 100,

//     onClose:()=>{
//       alert('Window closed')2
//     },

//     callback: function(response:any){
//       window.location = "/payments/info?reference=" + response.reference
//     }
//   });

//   handler.openIframe()
// };

export interface UserLocation {
  latitude: number;
  longitude: number;
}

interface LocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const watchUserLocation = (
  onSuccess: (location: UserLocation) => void,
  onError: (error: GeolocationPositionError) => void,
  options?: LocationOptions
): number | null => {
  if ("geolocation" in navigator) {
    return navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onSuccess({ latitude, longitude });
      },
      (error) => {
        onError(error);
      },
      options
    );
  } else {
    console.error("Geolocation is not supported by your browser.");
    return null;
  }
};

export const clearWatch = (watchId: number | null): void => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }
};

export const getUserLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by your browser.'));
    }
  });
};


export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};




export function formatDate(inputDate:any) {
  const date = new Date(inputDate);
  
  // Get the components of the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  // Format the date as "DD/MM/YYYY HH:MM:SS"
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  
  return formattedDate;
}

// Example usage:


export function getCurrentDateTime() {
  // Get current date and time
  const currentDate = new Date();

  // Extract individual components of the date and time
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}



export function convertToTime(dateTimeString:any) {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format and determine AM/PM
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Handle 12-hour clock

  // Format minutes with leading zero if needed
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Construct the time string
  const timeString = `${displayHours}:${displayMinutes} ${meridiem}`;

  return timeString;
}

export function formatDateTime(dateTimeString:any) {
  // Create a Date object from the provided timestamp
  const date = new Date(dateTimeString);

  // Get the day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format and determine AM or PM
  const amPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert midnight (0) to 12

  // Format the time as "h:mm am/pm"
  const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}${amPm}`;

  // Return the formatted string
  return `${dayOfWeek}, ${time}`;
}



export function formatAmount(amount:any) {
  // Create a NumberFormat object with options to format as currency
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN', // Nigerian Naira
    minimumFractionDigits: 0,
  });

  // Format the amount using the NumberFormat object
  return formatter.format(amount);
}


export function convertToMonth(dateString: string): string {
  const dateObj: Date = new Date(dateString);
  const monthAbbreviation: string = dateObj.toLocaleString('default', { month: 'short' });
  return monthAbbreviation;
}

export function getDayFromDate(dateString: string): number {
  const dateObj: Date = new Date(dateString);
  const dayOfMonth: number = dateObj.getDate();
  return dayOfMonth;
}


export function replaceHttpWithHttps(url:any) {
  // Check if the string is undefined or null
  if (!url) {
    return url;
  }

  // Check if the string starts with "http://"
  if (url.startsWith && url.startsWith('http://')) {
    // Replace "http://" with "https://"
    return url.replace(/^http:\/\//, 'https://');
  }

  // If the string already starts with "https://", return it as is
  if (url.startsWith && url.startsWith('https://')) {
    return url;
  }

  // If the string doesn't start with either, assume it's HTTPS
  return 'https://' + url;
}

export function formatAttendanceNumber(value: number): string {
  if (value >= 1000000) {
      // Format number in millions
      return `+ ${(value / 1000000).toFixed(1)}M+`;
  } else if(value === 0 ){
    return `${value}`
  }
  else if (value >= 1000) {
      // Format number in thousands
      return ` ${(value / 1000).toFixed(1)}K+`;
  } else {
      // No formatting needed
      return `${value}`;
  }
}


export function formatTrendingEventDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}

export function formatNumberToNaira(input: any) {
  if (input < 1000) {
    return `₦${input}`;
  } else if (input >= 1000 && input < 10000) {
   let formattedNum = (input / 1000).toFixed(3);
   // Remove the last digit if it's zero
   if (formattedNum.slice(-1) === "0") {
     formattedNum = formattedNum.slice(0, -4);
   }
   return "₦" + formattedNum + "k";
  } else if (input >= 10000 && input < 100000) {
    const decimalPart = input % 1000 === 0 ? "" : `.${input % 1000}`;
    const formattedDecimalPart = decimalPart.endsWith("0")
      ? decimalPart.slice(0, -1)
      : decimalPart;
    return `₦${Math.floor(input / 1000)}${formattedDecimalPart}k`;
  } else if (input >= 100000 && input < 1000000) {
    return `₦${(input / 1000).toFixed(0)}k`;
  } else if (input >= 1000000) {
    let numberString = input.toString();

    // Add commas to the number string
    var formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return "₦" + formattedNumber;
  }
}


export function convertTimeToCustomFormat(dateString:string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date(dateString);
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedTime = `${day} ${dateNum} ${month} - `;

  return formattedTime;
}