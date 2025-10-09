import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="md:flex md:items-center md:justify-between mb-8">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
      </div>
      {action && (
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            href={action.href}
            className="inline-flex items-center px-4 py-2 border border-transparent 
                     rounded-md shadow-sm text-sm font-medium text-white 
                     bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500"
          >
            {action.icon && <action.icon className="w-4 h-4 mr-2" />}
            {action.label}
          </Link>
        </div>
      )}
    </div>
  );
}
