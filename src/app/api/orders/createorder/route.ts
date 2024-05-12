import establishconnection from "../../../_kernel/utils/establishconnection";

import Order from '../../../_kernel/schemas/order';
import { dateGetter, makeID } from '../../../_kernel/reusables/generatefns';
import { NextRequest, NextResponse } from "next/server";
import { createUniqueOrderID } from "@/app/_kernel/helpers/orderhelpers";

export async function POST(req: NextRequest) {
    const rqst = await req.json();
	return await establishconnection().then(async () => {

        const newOrderID = await createUniqueOrderID("ORD_" + makeID(15));
        const neworder = new Order({
            orderID: newOrderID,
            dateMade: dateGetter(),
            dateUpdated: "",
            ...rqst
        })
        
        return await neworder.save().then(() => {
            return NextResponse.json({ status: true, message: "Order has been saved" });
        }).catch((err: any) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "There was a problem saving the order" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}