import establishconnection from "../../../_kernel/utils/establishconnection";

import Product from '../../../_kernel/schemas/product';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	return await establishconnection().then(async () => {
        return await Product.find({}).then((result) => {
            return NextResponse.json({ status: true, result: result });
        }).catch((err) => {
            return NextResponse.json({ status: false, message: "Error fetching product list" });
        })

        // return NextResponse.json({ status: true, message: "Account creation has been stalled" });
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}