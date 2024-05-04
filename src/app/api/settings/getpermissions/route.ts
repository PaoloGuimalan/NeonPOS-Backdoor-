import establishconnection from "../../../_kernel/utils/establishconnection";

import UserPermission from '../../../_kernel/schemas/userpermission';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	return await establishconnection().then(async () => {
		return await UserPermission.find({}).then((result) => {
            return NextResponse.json({ status: true, result: result });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error fetching permission" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}