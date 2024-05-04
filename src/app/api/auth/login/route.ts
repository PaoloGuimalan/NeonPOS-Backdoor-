import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    return NextResponse.json({ status: true, message: `Next API test` });
    // res.send({ status: true, message: "Next API test" });
}