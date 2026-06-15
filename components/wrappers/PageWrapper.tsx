import React from "react";

interface PageWrapperProps extends React.ComponentPropsWithoutRef<"main"> {
  children: React.ReactNode;
}

/**
 * PageWrapper component acts as the main semantic container for page routes.
 * It establishes a container query context (`container-name: page`) allowing
 * descendant sections or components to query its width.
 */
export default function PageWrapper({
  children,
  className = "",
  id = "main-content",
  ...props
}: PageWrapperProps) {
  return (
    <main
      id={id}
      className={`flex-1 w-full flex flex-col ${className}`}
      style={{
        containerType: "inline-size",
        containerName: "page",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </main>
  );
}
