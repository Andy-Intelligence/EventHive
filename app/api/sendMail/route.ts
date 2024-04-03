import { compileWelcomeTemplate, sendMail } from "@/utils/mail";
import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";
import { NextResponse } from "next/server";
import { formatDate } from "@/utils/helpingFunctions/functions";

export async function POST(request: any) {
  try {
    const bodi = await request.json();
    let {
      to,
      name,
      subject,
      body,
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
      orderId,
    } = bodi.formData;
    // console.log(email, password);

    await connectMongoDb();


    
    // Call sendMail function
    await sendMail({
      to: "andidiongu@gmail.com",
      name: "andy",
      subject: "test mail",
      //   body: `<h1>Hello world!</h1>`,
      body: compileWelcomeTemplate(
        name,
        eventFlyer,
        confirmationNumber,
        formatDate(date),
        timeStart,
        timeEnd,
        noOfTickets,
        mobileNumber,
        ticketType,
        location,
        price,
        orderDate,
        userId,
        orderId
      ),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
