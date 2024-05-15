import establishconnection from "../../../../_kernel/utils/establishconnection";

import Order from '../../../../_kernel/schemas/order';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { GetOrdersParamsJwtPayload } from "@/app/_kernel/vars/interfaces";

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
    const rqst = await req.json();
    const { userID } = jwt.verify(params.token, "") as GetOrdersParamsJwtPayload;

	return await establishconnection().then(async () => {
        return await Order.find({ "orderMadeBy.userID": userID }).then((result) => {
            return NextResponse.json({ status: true, result: result });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Cannot fetch orders" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}