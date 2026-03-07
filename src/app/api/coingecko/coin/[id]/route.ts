import { NextResponse } from "next/server";

/**
 * GET /api/coingecko/coin/[id]
 * Fetches coin details (price, market_cap, volume_24h, price_change_24h) from CoinGecko.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}?localization=false&tickers=false&market_data=true&community_data=false`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      const text = await res.text();
      console.error("CoinGecko coin API error:", res.status, text);
      return NextResponse.json(
        { error: "CoinGecko request failed", status: res.status },
        { status: 502 }
      );
    }
    const data = await res.json();
    const md = data?.market_data;
    if (!md) {
      return NextResponse.json(
        { error: "No market_data" },
        { status: 502 }
      );
    }
    const price = md.current_price?.usd ?? null;
    const market_cap = md.market_cap?.usd ?? null;
    const volume_24h = md.total_volume?.usd ?? null;
    const price_change_percentage_24h = md.price_change_percentage_24h ?? null;
    return NextResponse.json({
      price: typeof price === "number" ? price : null,
      market_cap: typeof market_cap === "number" ? market_cap : null,
      volume_24h: typeof volume_24h === "number" ? volume_24h : null,
      price_change_percentage_24h:
        typeof price_change_percentage_24h === "number"
          ? price_change_percentage_24h
          : null,
    });
  } catch (e) {
    console.error("CoinGecko coin fetch error:", e);
    return NextResponse.json(
      { error: "Failed to fetch from CoinGecko" },
      { status: 500 }
    );
  }
}
