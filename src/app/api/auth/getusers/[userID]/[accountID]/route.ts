import establishconnection from "../../../../../_kernel/utils/establishconnection";

import UserAccount from '../../../../../_kernel/schemas/useracccount';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userID: string, accountID: string } }) {
	return await establishconnection().then(async () => {
        return await UserAccount.aggregate([
            {
                $match: { "createdBy.userID": params.userID, accountID: params.accountID }
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
										{ $eq: [params.userID, "$from.userID"] }
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
            const userdetails = result.map((mp) => {
                const flattenedpermissions = mp.permissions.map((mpp: any) => mpp.permissionType);

                return {
                    ...mp,
                    permissions: flattenedpermissions
                }
            });
            return NextResponse.json({ status: true, result: userdetails });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error fetching account" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}