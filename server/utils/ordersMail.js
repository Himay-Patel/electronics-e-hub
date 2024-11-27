import nodemailer from "nodemailer";
import Order from "../models/orderModels.js";

const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "himay.glsbca20@gmail.com",
        pass: process.env.GMAIL_PASS,
    },
});

const sendOrdersMail = async (orderId) => {
    const order = await Order.findOne({ _id: orderId }).select("_id userId totalAmount orderItems address status createdAt updatedAt")
        .populate({
            path: "orderItems.productId",
            select: "-quantityAvailable -updatedAt -__v -createdAt"
        }).populate({
            path: "userId",
            select: "username email"
        }).populate({
            path: "address",
            select: "street city state zipCode"
        });

    // orderItems
    console.log(order.orderItems);

    const orderDate = new Date(order.createdAt);
    const deliveryOrDispatchDate = new Date(order.updatedAt);

    // Cancel Mail Body
    const canceledMail = `Dear ${order.userId.username},

We regret to inform you that your order ${order._id} has been canceled.

If you have any questions or need further assistance, feel free to reach out to us at [support email/phone number].

We apologize for any inconvenience caused and hope to serve you again soon.

Thank you for your understanding.

Best regards,
Electronic E-Hub
Customer Support Team`;

    // Confirm Mail Body
    const confirmedMail = `Dear ${order.userId.username},

Thank you for your order! We are happy to inform you that your order ${order._id} has been successfully confirmed. It will now be processed and shipped soon.

Here are the details of your order:

Order Number: ${order._id}
Order Date: ${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()}
Items: [List of Items]
Shipping Address: ${order.address.street},${order.address.city},${order.address.state},${order.address.zipCoded}
If you have any questions about your order or need assistance, please contact us at [support email/phone number].

We appreciate your business and will keep you updated on the status of your order.

Best regards,
Electronic E-Hub
Customer Support Team`;

    // Deliver Mail Body
    const deliveredMail = `Dear ${order.userId.username},

We are pleased to inform you that your order ${order._id} has been successfully delivered to the address you provided.

Here are the details of your order delivery:

Order Number: ${order._id}
Delivery Date: ${deliveryOrDispatchDate.getDate()}-${deliveryOrDispatchDate.getMonth() + 1}-${deliveryOrDispatchDate.getFullYear()}
Delivered To: ${order.address.street},${order.address.city},${order.address.state},${order.address.zipCoded}
Items: [List of Items]
If there are any issues with your order or you need further assistance, please do not hesitate to contact us at [support email/phone number].

Thank you for shopping with us!

Best regards,
Electronic E-Hub
Customer Support Team`;

    // Dispatch Mail Body
    const dispathcedMail = `Dear ${order.userId.username},

We are excited to let you know that your order ${order._id} has been dispatched and is on its way!

Here are the details:

Order Number: ${order._id}
Dispatch Date: ${deliveryOrDispatchDate.getDate()}-${deliveryOrDispatchDate.getMonth() + 1}-${deliveryOrDispatchDate.getFullYear()}
Your order should arrive shortly, and we will continue to monitor its progress.

If you have any questions or need further assistance, please reach out to us at [support email/phone number].

Thank you for choosing Electronic E-Hub!

Best regards,
Electronic E-Hub
Customer Support Team`;

    let subject;
    let html;

    if (order.status == "canceled") {
        subject = `Order ${order._id} - Canceled`;
        html = canceledMail;
    } else if (order.status == "confirmed") {
        subject = `Order ${order._id} - Confirmed`;
        html = confirmedMail;
    } else if (order.status == "delivered") {
        subject = `Order ${order._id} - Delivered`;
        html = deliveredMail;
    } else {
        subject = `Order ${order._id} - Dispatched`;
        html = dispathcedMail;
    }

    const mailOption = {
        from: "Electronic E-Hub <himay.glsbca20@gmail.com>",
        to: order.userId.email,
        subject: subject,
        html: html,
    };
    await transpoter.sendMail(mailOption);
}

export { sendOrdersMail }