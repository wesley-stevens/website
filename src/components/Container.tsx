import type { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    // Site-wide content width: up to 1600px, so columns use most of the screen.
    <div className={`mx-auto w-full max-w-[100rem] px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
