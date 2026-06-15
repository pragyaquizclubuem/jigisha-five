import React from "react";

interface SectionWrapperProps extends React.ComponentPropsWithoutRef<"section"> {
  children: React.ReactNode;
  /**
   * The semantic HTML tag to render. Defaults to 'section'.
   */
  as?: "section" | "div" | "header" | "footer" | "aside";
  /**
   * If true, the inner content spans the entire viewport width.
   * If false, the inner content is constrained to the standard max page width.
   */
  fullBleed?: boolean;
  /**
   * Additional class names to apply to the inner content container.
   */
  contentClassName?: string;
}

/**
 * SectionWrapper component provides standard page-width constraints and layout.
 * It uses a 3-column grid structure (.grid-layout-bleed) to align its inner container
 * while allowing full-width backgrounds to stretch edge-to-edge.
 * It also establishes a container query context (`container-name: section`) for its children.
 */
export default function SectionWrapper({
  children,
  as: Component = "section",
  fullBleed = false,
  className = "",
  contentClassName = "",
  style,
  ...props
}: SectionWrapperProps) {
  return (
    <Component
      className={`grid-layout-bleed w-full ${className}`}
      style={{
        containerType: "inline-size",
        containerName: "section",
        ...style,
      }}
      {...props}
    >
      <div className={`${fullBleed ? "col-full-width" : "col-content"} ${contentClassName}`}>
        {children}
      </div>
    </Component>
  );
}
