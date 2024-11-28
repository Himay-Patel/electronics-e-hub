import nodemailer from "nodemailer";
import Order from "../models/orderModels.js";
import PDFDocument from "pdfkit";

const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "himay.glsbca20@gmail.com",
        pass: process.env.GMAIL_PASS,
    },
});

const generateProductTable = (orderItems, totalAmount) => {
    return `
    <center>
        <table style="width: 70%; border-collapse: collapse; margin: 20px 0;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Total Price</th>
                </tr>
            </thead>
            <tbody>
                ${orderItems.map(item => `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.productId.name}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">₹ ${(item.productId.price).toFixed(2)}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">₹ ${(item.productId.price * item.quantity).toFixed(2)}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Total Amount:</strong><p>(service charges - 1%)</p></td>
                    <td style="border: 1px solid #ddd; padding: 8px;"><strong>₹ ${(totalAmount.toFixed(2))}</strong></td>
                </tr>
            </tbody>
        </table>
    </center>
    `;
};

// const generatePDF = (order) => {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument();
//         const buffers = [];

//         doc.on('data', buffers.push.bind(buffers));
//         doc.on('end', () => {
//             const pdfBuffer = Buffer.concat(buffers);
//             resolve(pdfBuffer); // Return the PDF buffer
//         });

//         doc.fontSize(25).text('Invoice', 50, 50);
//         doc.fontSize(12).text(`Order ID: ${order._id}`, 50, 100);
//         doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 50, 120);
//         doc.text(`Customer Name: ${order.userId.username}`, 50, 140);
//         doc.text(`Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipCode}`, 50, 160);

//         const productTable = generateProductTable(order.orderItems, order.totalAmount);
//         doc.text(productTable, 50, 200);

//         doc.end();
//     });
// };

const generatePDF = (order) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer); // Return the PDF buffer
        });

        // Title
        // const title = 'Electronic E-Hub';
        // const pageWidth = doc.page.width;
        // const titleWidth = doc.widthOfString(title);
        // const titleX = (pageWidth - titleWidth) / 2;
        // doc.fontSize(25).text(title, titleX, 50);
        doc.fontSize(25);
        const text = "Electronic E-Hub";
        const titleWidth = doc.widthOfString(text);
        const pageWidth = doc.page.width;
        const titleX = (pageWidth - titleWidth) / 2;
        doc.text(text, titleX, 50);

        // Order and Customer Info
        doc.fontSize(12).text(`Order ID: ${order._id}`, 50, 100);
        doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 50, 120);
        doc.text(`Customer Name: ${order.userId.username}`, 50, 140);
        doc.text(`Email: ${order.userId.email}`, 50, 160);
        doc.text(`Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipCode}`, 50, 180);

        // Product Table
        let yPosition = 220; // Starting y position for table

        // Draw table header
        doc.fontSize(12).font("Helvetica-Bold")
            .text("Sr. No.", 50, yPosition, { width: 50, align: 'center' })
            .text("Product Name", 100, yPosition, { width: 200, align: 'left' })
            .text("Price", 300, yPosition, { width: 100, align: 'right' })
            .text("Quantity", 400, yPosition, { width: 100, align: 'right' })
            .text("Total", 500, yPosition, { width: 100, align: 'right' });

        // Move to the next row
        yPosition += 20;

        // Draw each product row with Serial Number
        doc.fontSize(12).font("Helvetica");
        order.orderItems.forEach((item, index) => {
            const totalPrice = item.productId.price * item.quantity;
            const serialNumber = index + 1;  // Serial number starts from 1

            doc.text(serialNumber.toString(), 50, yPosition, { width: 50, align: 'center' })
                .text(item.productId.name, 100, yPosition, { width: 200, align: 'left' })
                .text(`Rs. ${item.productId.price.toFixed(2)}`, 300, yPosition, { width: 100, align: 'right' })
                .text(item.quantity, 400, yPosition, { width: 100, align: 'right' })
                .text(`Rs. ${totalPrice.toFixed(2)}`, 500, yPosition, { width: 100, align: 'right' });

            // Move to the next row
            yPosition += 20;
        });

        // Draw the total amount at the bottom
        const totalAmount = order.totalAmount;
        doc.fontSize(12).font("Helvetica-Bold")
            .text("Total Amount(service charges - 1%)", 400, yPosition, { width: 100, align: 'right' })
            .text(`Rs. ${totalAmount.toFixed(2)}`, 500, yPosition, { width: 100, align: 'right' });

        // Order Status and Footer
        yPosition += 40;
        doc.text(`Order Status: ${order.status}`, 50, yPosition);
        doc.text('Thank you for shopping with us!', 50, yPosition + 20);

        doc.end();
    });
};

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
    // console.log(order.orderItems);

    const orderDate = new Date(order.createdAt);
    const deliveryOrDispatchDate = new Date(order.updatedAt);

    // Cancel Mail Body
    const canceledMail = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #ff4d4d;">Order Canceled</h2>
        <p>Dear <strong>${order.userId.username}</strong>,</p>
        <p>We regret to inform you that your order <strong>${order._id}</strong> has been canceled.</p>
        <p>Below are the details of your order:</p>
        <h2>Product details:</h2>
        ${generateProductTable(order.orderItems, order.totalAmount)}
        <p>If you have any questions or need further assistance, feel free to reach out to us at <a href="mailto:electronicehub123@gmail.com">electronicehub123@gmail.com</a>.</p>
        <p>We apologize for any inconvenience caused and hope to serve you again soon.</p>
        <br>
        <p>Thank you for your understanding.</p>
        <p>Best regards,</p>
        <p><strong>Electronic E-Hub</strong><br>Customer Support Team</p>
    </div>
`;

    // Confirm Mail Body
    const confirmedMail = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #28a745;">Order Confirmed</h2>
        <p>Dear <strong>${order.userId.username}</strong>,</p>
        <p>Thank you for your order! Your order <strong>${order._id}</strong> has been successfully confirmed. It will now be processed and shipped soon.</p>
        <p><strong>Order Details:</strong></p>
        <ul>
            <li><strong>Order Number:</strong> ${order._id}</li>
            <li><strong>Order Date:</strong> ${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()}</li>
            <li><strong>Shipping Address:</strong> ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipCode}</li>
        </ul>
        <p>Here are the details of your order:</p>
        <h2>Product details:</h2>
        ${generateProductTable(order.orderItems, order.totalAmount)}
        <p>If you have any questions about your order or need assistance, please contact us at <a href="mailto:electronicehub123@gmail.com">electronicehub123@gmail.com</a>.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Electronic E-Hub</strong><br>Customer Support Team</p>
    </div>
`;

    // Deliver Mail Body
    const deliveredMail = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #17a2b8;">Order Delivered</h2>
        <p>Dear <strong>${order.userId.username}</strong>,</p>
        <p>We are pleased to inform you that your order <strong>${order._id}</strong> has been successfully delivered to the address you provided.</p>
        <p><strong>Delivery Details:</strong></p>
        <ul>
            <li><strong>Order Number:</strong> ${order._id}</li>
            <li><strong>Delivery Date:</strong> ${deliveryOrDispatchDate.getDate()}-${deliveryOrDispatchDate.getMonth() + 1}-${deliveryOrDispatchDate.getFullYear()}</li>
            <li><strong>Delivered To:</strong> ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipCode}</li>
        </ul>
        <h2>Product details:</h2>
        ${generateProductTable(order.orderItems, order.totalAmount)}
        <p>If there are any issues with your order, please contact us at <a href="mailto:electronicehub123@gmail.com">electronicehub123@gmail.com</a>.</p>
        <br>
        <p>Thank you for shopping with us!</p>
        <p>Best regards,</p>
        <p><strong>Electronic E-Hub</strong><br>Customer Support Team</p>
    </div>
`;


    // Dispatch Mail Body
    const dispathcedMail = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #ffc107;">Order Dispatched</h2>
        <p>Dear <strong>${order.userId.username}</strong>,</p>
        <p>Your order <strong>${order._id}</strong> has been dispatched and is on its way!</p>
        <p><strong>Dispatch Details:</strong></p>
        <ul>
            <li><strong>Order Number:</strong> ${order._id}</li>
            <li><strong>Dispatch Date:</strong> ${deliveryOrDispatchDate.getDate()}-${deliveryOrDispatchDate.getMonth() + 1}-${deliveryOrDispatchDate.getFullYear()}</li>
        </ul>
        <h2>Product details:</h2>
        ${generateProductTable(order.orderItems, order.totalAmount)}
        <p>If you have any questions or need further assistance, please contact us at <a href="mailto:electronicehub123@gmail.com">electronicehub123@gmail.com</a>.</p>
        <br>
        <p>Thank you for choosing us!</p>
        <p>Best regards,</p>
        <p><strong>Electronic E-Hub</strong><br>Customer Support Team</p>
    </div>
`;

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

    const pdfBuffer = await generatePDF(order);

    const mailOption = {
        from: "Electronic E-Hub <himay.glsbca20@gmail.com>",
        to: order.userId.email,
        subject: subject,
        html: html,
        attachments: [
            {
                filename: `E-hub-${order._id}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf',
            },
        ],
    };
    await transpoter.sendMail(mailOption);
}

export { sendOrdersMail }