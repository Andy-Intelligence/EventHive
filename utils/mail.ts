import nodemailer from "nodemailer"
// import * as handlebars from 'handlebars/dist/cjs/handlebars'
import {template} from "@/utils/templates/mailTickets"
import * as handlebars from "handlebars"



export  async function sendMail({to,name,subject,body}:{to:string;name:string;subject:string;body:string}){
    const {SMTP_EMAIL, SMTP_PASSWORD} = process.env



    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:SMTP_EMAIL,
            pass:SMTP_PASSWORD
        }
    })


    try {
        const testResult = await transport.verify();
        console.log(testResult)
    } catch (error) {
        console.log(error)

        return
    }


    try {
        const sendResult =  await transport.sendMail({from:SMTP_EMAIL,to,subject,html:body})
        console.log(sendResult)
    } catch (error) {
     console.log(error)   
    }
}


export  function compileWelcomeTemplate(
  name:any,
  eventFlyer:any,
  confirmationNumber:any,
  date:any,
  timeStart:any,
  timeEnd:any,
  noOfTickets:any,
  mobileNumber:any,
  ticketType:any,
  location:any,
  price:any,
  orderDate:any,
  userId:any,
  orderNumber:any,
){
    const temp = handlebars.compile(template)
    const htmlBody = temp({
      name,
      eventFlyer,
      confirmationNumber,
      date,
      timeStart,
      timeEnd,
      noOfTickets,
      mobileNumber,
      ticketType,
      location,
      price,
      orderDate,
      userId,
      orderNumber,
      total:price*noOfTickets
    });

    return htmlBody
}