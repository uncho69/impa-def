"use client";

import { SignIn } from "@clerk/nextjs";

export function EmbeddedSignIn() {
  return (
    <div className="w-full max-w-md mx-auto">
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none border-0 bg-transparent",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: "bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium",
            formButtonPrimary: "bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200",
            formFieldInput: "border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
            footerActionLink: "text-primary-600 hover:text-primary-700 font-medium",
            identityPreviewText: "text-neutral-600",
            formFieldLabel: "text-neutral-700 font-medium mb-2",
            dividerLine: "bg-neutral-300",
            dividerText: "text-neutral-500",
            formResendCodeLink: "text-primary-600 hover:text-primary-700",
            otpCodeFieldInput: "border border-neutral-300 rounded-lg px-4 py-3 text-center focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
            formFieldSuccessText: "text-green-600",
            formFieldErrorText: "text-red-600",
            alertText: "text-red-600",
            formHeaderTitle: "hidden",
            formHeaderSubtitle: "hidden",
            footer: "hidden",
            socialButtonsBlockButton__github: "hidden",
            socialButtonsBlockButton__apple: "hidden",
            socialButtonsBlockButton__microsoft: "hidden",
            socialButtonsBlockButton__facebook: "hidden",
            socialButtonsBlockButton__discord: "hidden",
            socialButtonsBlockButton__twitch: "hidden",
            socialButtonsBlockButton__x: "hidden",
            socialButtonsBlockButton__linkedin: "hidden",
            socialButtonsBlockButton__bitbucket: "hidden",
            socialButtonsBlockButton__gitlab: "hidden",
            socialButtonsBlockButton__hubspot: "hidden",
            socialButtonsBlockButton__notion: "hidden",
            socialButtonsBlockButton__slack: "hidden",
            socialButtonsBlockButton__spotify: "hidden",
            socialButtonsBlockButton__steam: "hidden",
            socialButtonsBlockButton__tiktok: "hidden",
            socialButtonsBlockButton__twitter: "hidden",
            socialButtonsBlockButton__youtube: "hidden",
            socialButtonsBlockButton__zoom: "hidden",
          },
          variables: {
            colorPrimary: "#3b82f6",
            colorBackground: "#ffffff",
            colorInputBackground: "#ffffff",
            colorInputText: "#111827",
            colorText: "#374151",
            colorTextSecondary: "#6b7280",
            borderRadius: "0.5rem",
            fontFamily: "Montserrat, sans-serif",
          },
        }}
        routing="hash"
        signUpUrl="#signup"
        redirectUrl="/"
      />
    </div>
  );
}