import { NextResponse } from "next/server";

/**
 * GET /api/coingecko?ids=bitcoin,ethereum,solana
 * Fetches price and market_cap from CoinGecko public API.
 * Rate limit: free tier ~10-30 req/min; batch up to 250 ids per request.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");
  if (!ids || !ids.trim()) {
    return NextResponse.json({ error: "Missing ids" }, { status: 400 });
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_market_cap=true`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      const text = await res.text();
      console.error("CoinGecko API error:", res.status, text);
      return NextResponse.json(
        { error: "CoinGecko request failed", status: res.status },
        { status: 502 }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("CoinGecko fetch error:", e);
    return NextResponse.json(
      { error: "Failed to fetch from CoinGecko" },
      { status: 500 }
    );
  }
}
