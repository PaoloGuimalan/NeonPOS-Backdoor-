import establishconnection from "../../../_kernel/utils/establishconnection";

import Order from '../../../_kernel/schemas/order';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const rqst = await req.json();
	return await establishconnection().then(async () => {
        const orderID = rqst.orderID;
        const amountreceived = rqst.amountreceived;
        const userID = rqst.orderMadeBy.userID;
        const deviceID = rqst.orderMadeBy.deviceID;
        return await Order.updateOne({ orderID: orderID, "orderMadeBy.userID": userID, "orderMadeBy.deviceID": deviceID }, { receivedAmount: amountreceived, status: "Initial" }).then(async () => {
            return await Order.find({ orderID: orderID, "orderMadeBy.userID": userID, "orderMadeBy.deviceID": deviceID }).then((result) => {
                return NextResponse.json({ status: true, message: "Order has been closed", result: result });
            }).catch((err) => {
                console.log(err);
                return NextResponse.json({ status: false, message: "Error fetching order details" });
            })
        }).catch((err: any) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "There was a problem closing the order" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}