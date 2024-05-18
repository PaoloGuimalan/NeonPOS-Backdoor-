import establishconnection from "../../../../_kernel/utils/establishconnection";

import UserAccount from '../../../../_kernel/schemas/useracccount';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userID: string } }) {
	return await establishconnection().then(async () => {
        return await UserAccount.find({ "createdBy.userID": params.userID }, { password: 0 }).sort({ _id: -1 }).then((result) => {
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