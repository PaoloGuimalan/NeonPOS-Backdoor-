import establishconnection from "../../../_kernel/utils/establishconnection";

import Product from '../../../_kernel/schemas/product';
import { dateGetter, makeID } from '../../../_kernel/reusables/generatefns';
import { createUniqueProductID } from '../../../_kernel/helpers/producthelpers';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const rqst = await req.json();
	return await establishconnection().then(async () => {
        const productName = rqst.productName;
        const productPrice = rqst.productPrice;
        const productQuantity = rqst.productQuantity;
        const category = rqst.category;

        const accountID = rqst.accountID;

        const newProductID = await createUniqueProductID("PRD_ID_" + makeID(15));
        const newproduct = new Product({
            productID: newProductID,
            productName: productName,
            productPrice: productPrice,
            productQuantity: productQuantity,
            category: category,
            previews: [
                "https://firebasestorage.googleapis.com/v0/b/neon-systems.appspot.com/o/pos%2Fproducts%2F214-2143190_food-plate-black-and-white-hd-png-download.png?alt=media&token=615ad1b6-7598-4a35-accc-a2cc6150c6fa"
            ],
            addedBy: {
                accountID: accountID,
                deviceID: "DVC_47497429610967951139"
            },
            dateAdded: dateGetter()
        })

        return await newproduct.save().then(() => {
            return NextResponse.json({ status: true, message: "Product creation has been successful" });
        }).catch((err: any) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "Error saving product" });
        })

        // return NextResponse.json({ status: true, message: "Account creation has been stalled" });
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}