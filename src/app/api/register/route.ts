import { NextResponse } from "next/server";

const ZAPIER_API_URI = process.env.ZAPIER_API_URI || "";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (typeof email !== "string")
    return NextResponse.json(
      { message: "Invalid input type" },
      { status: 400 }
    );

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!regex.test(email)) {
    return NextResponse.json(
      {
        message: "Invalid email",
      },
      { status: 400 }
    );
  }

  const result = await fetch(ZAPIER_API_URI, {
    method: "POST",
    body: JSON.stringify({ contact: { email, timestamp: Date.now() } }),
  });

  const { status } = (await result.json()) as {
    status: string;
    attempt: string;
    id: string;
    request_id: string;
  };
  if (status !== "success") {
    return NextResponse.json(
      {
        message: "Failed to send email",
        status,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ status });
}
