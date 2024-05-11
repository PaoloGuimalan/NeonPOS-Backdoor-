import establishconnection from "../../../_kernel/utils/establishconnection"

import UserAccount from '../../../_kernel/schemas/useracccount';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const rqst = await req.json();
	return await establishconnection().then(async () => {
		const accountID = rqst.accountID;
		const password = rqst.password;
		const userID = rqst.userID;
		return await UserAccount.aggregate([
			{
				$match: {
					$and: [
						{
							accountID: accountID
						},
						{
							password: password
						},
						{
							"createdBy.userID": userID
						}
					]
				}
			},
			{
				$lookup: {
					from: "userpermissions",
					// localField: "accountType",
					// foreignField: "allowedUsers",
					let: { accountType: "$accountType" },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [
										{ $in: ["$$accountType", "$allowedUsers"] },
										{ $eq: [true, "$isEnabled"] },
										{ $eq: [userID, "$from.userID"] }
									]
								}
							}
						}
					],
					as: "permissions"
				}
			},
			{
				$project: {
					"password": 0,
					"permissions._id": 0,
					"permissions.permissionID": 0,
					"permissions.allowedUsers": 0,
					"permissions.isEnabled": 0,
					"permissions.__v": 0
				}
			}
		]).then((result) => {
			if(result.length > 0){
				return NextResponse.json({ status: true, result: result });
			}
			else{
				return NextResponse.json({ status: false, message: "No Account matched" });
			}
		}).catch((err) => {
			return NextResponse.json({ status: false, result: err });
		})
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, result: err });
	})
}