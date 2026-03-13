import type { Metadata } from "next";
import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { LayoutWithConditionalNav } from "@/components/LayoutWithConditionalNav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { fontClassNames } from "./fonts";
import { AIBotAuthModal } from "@/components/AIBotAuthModal";
import { PrivyClientProvider } from "@/components/PrivyClientProvider";
import { PrivyAuthBridge } from "@/components/auth/PrivyAuthBridge";
import { AnalyticsConsentManager } from "@/components/analytics/AnalyticsConsentManager";
import { LanguageAutoTranslate } from "@/components/LanguageAutoTranslate";

export const metadata: Metadata = {
  title: "ImparoDeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPrivyConfigured = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim());

  const themeScript = (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var t=localStorage.getItem('imparodefi-theme');if(t==='light'||t==='dark'){document.documentElement.classList.add(t);}else{document.documentElement.classList.add('dark');}})();`,
      }}
    />
  );

  const content = (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontClassNames} text-neutral-900 antialiased font-montserrat bg-background flex flex-col min-h-screen`}>
        {themeScript}
        <PrivyClientProvider>
          {isPrivyConfigured ? <PrivyAuthBridge /> : null}
          <LanguageProvider>
            <LanguageAutoTranslate />
            <AIBotAuthModal />
            <AnalyticsConsentManager />
            <div id="app-content-root" className="w-full">
              <LayoutWithConditionalNav>{children}</LayoutWithConditionalNav>
            </div>
          </LanguageProvider>
        </PrivyClientProvider>
      </body>
    </html>
  );

  return content;
}
