import establishconnection from "../../../_kernel/utils/establishconnection";

import UserPermission from '../../../_kernel/schemas/userpermission';
import { makeID } from '../../../_kernel/reusables/generatefns';
import { createPermissionID } from '../../../_kernel/helpers/settingshelper';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const rqst = await req.json();
	return await establishconnection().then(async () => {
        const permissionType = rqst.permissionType;
        const allowedUsers = rqst.allowedUsers;

		const newPermissionID = await createPermissionID("PRM_ID_" + makeID(15));
		const newpermission = new UserPermission({
            permissionID: newPermissionID,
            permissionType: permissionType,
            allowedUsers: allowedUsers,
            isEnabled: true,
        })

        // res.send({ status: true, message: "Permission creation has been stalled" });

        return await newpermission.save().then(() => {
            return NextResponse.json({ status: true, message: "Permission has been created" })
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error creating permission" });
	})
}