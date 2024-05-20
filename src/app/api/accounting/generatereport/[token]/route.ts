import establishconnection from "../../../../_kernel/utils/establishconnection";

import Order from '../../../../_kernel/schemas/order';
import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "@/app/_kernel/vars/keys";
import jwt from 'jsonwebtoken';
import { GenerateReportJwtPayload } from "@/app/_kernel/vars/interfaces";

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
	return await establishconnection().then(async () => {
        const { userID, deviceID, datescope, timescope } = jwt.verify(params.token, JWT_SECRET) as GenerateReportJwtPayload;
        return await Order.aggregate([
            {
                $match: {
                    $and: [
                        { "orderMadeBy.deviceID": deviceID },
                        { "orderMadeBy.userID": userID },
                        { dateMade: datescope },
                        {
                            $or: [
                                { status: "Initial" },
                                { status: "Renewed" }
                            ]
                        }
                    ]
                }
            },{
                $group: {
                    _id: null,
                    dateMade: { $first: "$dateMade" },
                    numberofsales: { $sum: 1 },
                    totalsales: { $sum: "$totalAmount" },
                    discount: { $avg: "$discount" }
                }
            },{
                $project: {
                    numberofsales: 1,
                    totalsales: 1,
                    dateMade: 1,
                    discount: 1,
                    discounttotal: { $multiply: ["$totalsales", { $divide: ["$discount", 100] }] },
                    saleswdiscount: { $subtract: ["$totalsales", { $multiply: ["$totalsales", { $divide: ["$discount", 100] }] }] },
                    taxtotal: { $multiply: [{ $subtract: ["$totalsales", { $multiply: ["$totalsales", { $divide: ["$discount", 100] }] }] }, 0.12] },
                    taxedsales: { $subtract: [{ $subtract: ["$totalsales", { $multiply: ["$totalsales", { $divide: ["$discount", 100] }] }] },{ $multiply: [{ $subtract: ["$totalsales", { $multiply: ["$totalsales", { $divide: ["$discount", 100] }] }] }, 0.12] }] }
                }
            }
        ]).then((result) => {
            return NextResponse.json({ status: true, result: result });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error generating report" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}