import establishconnection from "../../../../_kernel/utils/establishconnection";

import UserAccount from '../../../../_kernel/schemas/useracccount';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/app/_kernel/vars/keys";
import { RemoveUserParamsJwtPayload } from "@/app/_kernel/vars/interfaces";

export async function DELETE(req: NextRequest, { params }: { params: { token: string } }) {
    const { userID, accountID } = jwt.verify(params.token, JWT_SECRET) as RemoveUserParamsJwtPayload;

	return await establishconnection().then(async () => {
		return await UserAccount.findOneAndDelete({ "createdBy.userID": userID, accountID: accountID }).then(() => {
            return NextResponse.json({ status: true, message: `${accountID} has been deleted` });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error deleting account" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}