import { NextResponse } from "next/server";

export const success = (data, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

export const error = (message, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status });

export const notFound = (message, status = 404) =>
  NextResponse.json({ success: false, error: message }, { status });