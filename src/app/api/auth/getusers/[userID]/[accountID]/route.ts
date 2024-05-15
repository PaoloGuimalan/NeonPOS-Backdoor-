import establishconnection from "../../../../../_kernel/utils/establishconnection";

import UserAccount from '../../../../../_kernel/schemas/useracccount';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userID: string, accountID: string } }) {
	return await establishconnection().then(async () => {
        return await UserAccount.find({ "createdBy.userID": params.userID, accountID: params.accountID }, { password: 0 }).then((result) => {
            return NextResponse.json({ status: true, result: result });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error fetching account" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}