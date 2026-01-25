import { redirect } from "next/navigation";

export default function Registrati({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const next = searchParams?.next || "/manuale";
  redirect(`https://accounts.imparodefi.xyz/sign-up?redirect_url=${encodeURIComponent(next)}`);
}

