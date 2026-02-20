import { ReactNode } from "react";
import { BackToHome } from "./BackToHome";

interface PageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="flex justify-end mb-6">
          <BackToHome />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
            {title}
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        {children}
      </div>
    </div>
  );
}
