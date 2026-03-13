import { getSiteSettings } from "@/lib/site-settings";

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-900/20 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-white">{settings.legal.privacyPolicyTitle}</h1>
        <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
          {settings.legal.privacyPolicyContent}
        </div>
      </div>
    </div>
  );
}
