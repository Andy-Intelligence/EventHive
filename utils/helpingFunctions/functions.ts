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
    minimumFractionDigits: 2,
  });

  // Format the amount using the NumberFormat object
  return formatter.format(amount);
}

