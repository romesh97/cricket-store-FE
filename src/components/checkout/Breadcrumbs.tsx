import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { ChevronRight } from "lucide-react";

type BreadcrumbStep = {
  name: string;
  href: string;
  isCurrent: boolean;
};

interface BreadcrumbsProps {
  steps: BreadcrumbStep[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ steps }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {steps.map((step, index) => (
          <li key={step.name} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
            )}

            <Link
              to={step.href}
              className={cn(
                "inline-flex items-center text-sm font-medium",
                step.isCurrent
                  ? "text-[#0A1E38] font-bold"
                  : "text-gray-500 hover:text-[#145DA0]"
              )}
              aria-current={step.isCurrent ? "page" : undefined}
            >
              {step.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
