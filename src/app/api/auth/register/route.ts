import establishconnection from "../../../_kernel/utils/establishconnection";

import UserAccount from '../../../_kernel/schemas/useracccount';
import { createUniqueAccountID } from '../../../_kernel/helpers/authhelper';
import { dateGetter, makeID } from '../../../_kernel/reusables/generatefns';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const rqst = await req.json();
	return await establishconnection().then(async () => {
        const firstname = rqst.firstname;
        const middlename = rqst.middlename;
        const lastname = rqst.lastname;

        const accountType = rqst.accountType;
        const password = rqst.password;

        const creatorAccountID = rqst.creatorAccountID;

        const newAccountID = await createUniqueAccountID("ACC_ID_" + makeID(15));
		const newaccount = new UserAccount({
            accountID: newAccountID,
            accountType: accountType,
            accountName: {
                firstname: firstname,
                middlename: middlename,
                lastname: lastname
            },
            password: password,
            dateCreated: dateGetter(),
            createdBy: {
                accountID: creatorAccountID,
                deviceID: "DVC_47497429610967951139"
            }
        })

        // res.send({ status: true, message: "Account creation has been stalled" });

        return await newaccount.save().then(() => {
            return NextResponse.json({ status: true, message: "Admin account has been created" })
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error creating account" });
	})
}