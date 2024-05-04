import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: { params: { message: string } }) {
    console.log(params.message);
    return NextResponse.json({ status: true, message: `Next API test ${params.message}` });
    // res.send({ status: true, message: "Next API test" });
}