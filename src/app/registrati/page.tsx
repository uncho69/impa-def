import { redirect } from "next/navigation";

export default function Registrati({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const next = searchParams?.next || "/manuale";
  redirect(`/sign-up?redirect_url=${encodeURIComponent(next)}`);
}

