import type { Metadata } from "next";
import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { LayoutWithConditionalNav } from "@/components/LayoutWithConditionalNav";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { fontClassNames } from "./fonts";
import { AIBotAuthModal } from "@/components/AIBotAuthModal";
import { PrivyClientProvider } from "@/components/PrivyClientProvider";
import { PrivyAuthBridge } from "@/components/auth/PrivyAuthBridge";
import { AnalyticsConsentManager } from "@/components/analytics/AnalyticsConsentManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ImparoDeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPrivyConfigured = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim());
  const isClerkConfigured = ((): boolean => {
    if (process.env.SKIP_CLERK === 'true') {
      return false;
    }

    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
    const secretKey = process.env.CLERK_SECRET_KEY?.trim();
    
    const hasPublishableKey = !!(
      publishableKey &&
      publishableKey.length > 20 &&
      (publishableKey.startsWith('pk_test_') || publishableKey.startsWith('pk_live_'))
    );
    
    const hasSecretKey = !!(
      secretKey &&
      secretKey.length > 20 &&
      (secretKey.startsWith('sk_test_') || secretKey.startsWith('sk_live_'))
    );
    
    return hasPublishableKey && hasSecretKey;
  })();

  const themeScript = (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var t=localStorage.getItem('imparodefi-theme');if(t==='light'||t==='dark'){document.documentElement.classList.add(t);}else{document.documentElement.classList.add('dark');}})();`,
      }}
    />
  );

  const content = (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontClassNames} text-neutral-900 antialiased font-montserrat bg-background flex flex-col items-center min-h-screen`}>
        {themeScript}
        <PrivyClientProvider>
          {isPrivyConfigured ? <PrivyAuthBridge /> : null}
          <LanguageProvider>
            <AIBotAuthModal />
            <AnalyticsConsentManager />
            <header className="hidden">{/* opzionale: pulsanti rapidi */}
              {isClerkConfigured ? (
                <>
                  <SignedOut>
                    <a href="/sign-in">Accedi</a>
                    <a href="/sign-up">Registrati</a>
                  </SignedOut>
                  <SignedIn>
                    <UserButton afterSignOutUrl="/sign-in" />
                  </SignedIn>
                </>
              ) : null}
            </header>
            <LayoutWithConditionalNav>{children}</LayoutWithConditionalNav>
          </LanguageProvider>
        </PrivyClientProvider>
      </body>
    </html>
  );

  // Always render ClerkProvider - components need it to use Clerk hooks
  // If keys aren't configured, Clerk will handle it gracefully
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() || '';
  
  // Configure redirect URLs - these are fallbacks if not specified in components
  const signInFallbackUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || '/';
  const signUpFallbackUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL || '/';
  
  // Note: Custom domain (accounts.imparodefi.xyz) is configured in Clerk Dashboard
  // Clerk automatically uses the custom domain based on the publishable key
  // The domain prop is not available in ClerkProvider for Next.js
  // Cookie cross-domain handling is managed by Clerk's server configuration
  
  return (
    <ClerkProvider 
      publishableKey={publishableKey}
      signInFallbackRedirectUrl={signInFallbackUrl}
      signUpFallbackRedirectUrl={signUpFallbackUrl}
    >
      {content}
    </ClerkProvider>
  );
}
