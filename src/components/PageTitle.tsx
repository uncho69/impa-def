import { ReactNode } from "react";
import { BackToHome } from "./BackToHome";

interface PageTitleProps {
  children: ReactNode;
  description?: string;
}

export function PageTitle({ children, description }: PageTitleProps) {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-background py-16">
      <div className="container-custom">
        <div className="flex justify-end mb-6">
          <BackToHome />
        </div>
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6 py-2">
            {children}
          </h1>
          {description && (
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
