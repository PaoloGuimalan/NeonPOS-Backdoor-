// import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { message: string } }) {
    console.log(params.message);
    return NextResponse.json({ status: true, message: `Next API test ${params.message}` });
    // res.send({ status: true, message: "Next API test" });
}