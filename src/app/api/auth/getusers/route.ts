import establishconnection from "../../../_kernel/utils/establishconnection";

import UserAccount from '../../../_kernel/schemas/useracccount';
import { NextResponse } from "next/server";

export async function GET() {
	return await establishconnection().then(async () => {
        return await UserAccount.find({}, { password: 0 }).then((result) => {
            return NextResponse.json({ status: true, result: result });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error fetching accounts" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}