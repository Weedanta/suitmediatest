import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-16 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-brand-primary mb-4 leading-none">
            404
          </h1>
          <div className="h-1 w-24 bg-brand-primary mx-auto mb-8"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>


        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              "bg-brand-primary text-white hover:bg-brand-primary-hover",
              "h-11 rounded-md px-8",
              "w-full sm:w-auto min-w-[200px]"
            )}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
