import establishconnection from "../../../../_kernel/utils/establishconnection";

import Order from '../../../../_kernel/schemas/order';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { GetOrdersParamsJwtPayload } from "@/app/_kernel/vars/interfaces";
import { JWT_SECRET } from "@/app/_kernel/vars/keys";

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
    // const rqst = await req.json();
    const { userID, orderID } = jwt.verify(params.token, JWT_SECRET) as GetOrdersParamsJwtPayload;

	return await establishconnection().then(async () => {
        if(orderID.trim() === ""){
            return await Order.find({ "orderMadeBy.userID": userID }).sort({ _id: -1 }).then((result) => {
                return NextResponse.json({ status: true, result: result });
            }).catch((err) => {
                console.log(err);
                return NextResponse.json({ status: false, message: "Cannot fetch orders" });
            })
        }
        else{
            return await Order.find({ "orderMadeBy.userID": userID, orderID: orderID }).then((result) => {
                return NextResponse.json({ status: true, result: result });
            }).catch((err) => {
                console.log(err);
                return NextResponse.json({ status: false, message: "Cannot fetch orders" });
            })
        }
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}