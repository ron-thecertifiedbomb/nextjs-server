
import { NextResponse } from "next/server";

export async function GET() {
  // Mock user data
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  ];

  return NextResponse.json(users);
}
