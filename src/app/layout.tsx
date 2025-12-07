import type { Metadata } from "next";
import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "@/components/Navbar";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Inter, Montserrat, Source_Code_Pro } from "next/font/google";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const sourceCode = Source_Code_Pro({
  variable: "--font-source-code",
  display: "swap",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImparoDeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  const content = (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} ${sourceCode.variable} text-neutral-900 antialiased font-montserrat bg-background flex flex-col items-center min-h-screen`}>
        <LanguageProvider>
          <Navbar />
          <header className="hidden">{/* opzionale: pulsanti rapidi */}
            {isClerkConfigured ? (
              <>
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            ) : null}
          </header>
          <main className="w-full flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );

  // Always render ClerkProvider - components need it to use Clerk hooks
  // If keys aren't configured, Clerk will handle it gracefully
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() || '';
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {content}
    </ClerkProvider>
  );
}
