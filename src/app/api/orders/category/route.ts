import establishconnection from "../../../_kernel/utils/establishconnection";

import Category from '../../../_kernel/schemas/category';
import { dateGetter, makeID } from '../../../_kernel/reusables/generatefns';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { createUniqueCategoryID } from "@/app/_kernel/helpers/categoryhelper";
import { JWT_SECRET } from "@/app/_kernel/vars/keys";
import { CreateCategoryParamsJwtPayload, TokenHeaderJwtPayload } from "@/app/_kernel/vars/interfaces";

export async function POST(req: NextRequest) {
    const rqst = await req.json();
    const decodedtoken = jwt.verify(rqst.token, JWT_SECRET) as CreateCategoryParamsJwtPayload;
	return await establishconnection().then(async () => {

        const newCategoryID = await createUniqueCategoryID("CAT_" + makeID(15));
        const newcategory = new Category({
            categoryID: newCategoryID,
            preview: "https://firebasestorage.googleapis.com/v0/b/neon-systems.appspot.com/o/pos%2Fcategories%2Fistockphoto-1447123177-612x612.jpg?alt=media&token=9ae6f040-2934-4606-9dbf-f9f71a440e66",
            ...decodedtoken
        })
        
        return await newcategory.save().then(() => {
            return NextResponse.json({ status: true, message: "Order has been saved", result: { categoryID: newCategoryID } });
        }).catch((err: any) => {
            console.log(err);
            return NextResponse.json({ status: false, message: "There was a problem saving the order" });
        })
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}

export async function GET(req: NextRequest) {
	return await establishconnection().then(async () => {
        const token = req.headers.get("x-access-token");
        if(token){
            const { userID } = jwt.verify(token, JWT_SECRET) as TokenHeaderJwtPayload;
            return await Category.find({ "from.userID": userID }).then((result) => {
                return NextResponse.json({ status: true, result: result });
            }).catch((err: any) => {
                console.log(err);
                return NextResponse.json({ status: false, message: "There was a problem fetching categories" });
            })
        }
        else{
            return NextResponse.json({ status: false, message: "Token invalid" });
        }
	}).catch((err) => {
		console.log(err);
        return NextResponse.json({ status: false, message: "Error establishing connection" });
	})
}