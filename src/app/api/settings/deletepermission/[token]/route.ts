import establishconnection from "../../../../_kernel/utils/establishconnection";

import UserPermission from '../../../../_kernel/schemas/userpermission';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/app/_kernel/vars/keys";
import { DeletePermissionParamsJwtPayload } from "@/app/_kernel/vars/interfaces";

export async function DELETE(req: NextRequest, { params }: { params: { token: string } }) {
    const { userID, permissionID } = jwt.verify(params.token, JWT_SECRET) as DeletePermissionParamsJwtPayload;

	return await establishconnection().then(async () => {
		return await UserPermission.findOneAndDelete({ "from.userID": userID, permissionID: permissionID }).then(() => {
            return NextResponse.json({ status: true, message: `${permissionID} has been deleted` });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error deleting permission" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}