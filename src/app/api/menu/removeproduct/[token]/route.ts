import establishconnection from "../../../../_kernel/utils/establishconnection";

import Product from '../../../../_kernel/schemas/product';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/app/_kernel/vars/keys";
import { DeleteProductParamsJwtPayload } from "@/app/_kernel/vars/interfaces";

export async function DELETE(req: NextRequest, { params }: { params: { token: string } }) {
    const { userID, productID } = jwt.verify(params.token, JWT_SECRET) as DeleteProductParamsJwtPayload;

	return await establishconnection().then(async () => {
		return await Product.findOneAndDelete({ "addedBy.userID": userID, productID: productID }).then(() => {
            return NextResponse.json({ status: true, message: `${productID} has been deleted` });
        }).catch((err) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error deleting permission" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}