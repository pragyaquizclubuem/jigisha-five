import React from 'react';

/**
 * Shared interface for SVG Icon components.
 * Extends the native SVGSVGElement properties to ensure seamless compatibility
 * with standard React attributes, plus adds an optional title for accessibility.
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
    title?: string;
}

// ============================================================================
// NAVIGATION ICONS
// ============================================================================

/**
 * MenuIcon (Hamburger Menu)
 */
export const MenuIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
    )
);
MenuIcon.displayName = 'MenuIcon';

/**
 * CloseIcon (X mark)
 */
export const CloseIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    )
);
CloseIcon.displayName = 'CloseIcon';

/**
 * ChevronDownIcon
 */
export const ChevronDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <polyline points="6 9 12 15 18 9" />
        </svg>
    )
);
ChevronDownIcon.displayName = 'ChevronDownIcon';

/**
 * ChevronUpIcon
 */
export const ChevronUpIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <polyline points="18 15 12 9 6 15" />
        </svg>
    )
);
ChevronUpIcon.displayName = 'ChevronUpIcon';

/**
 * ChevronLeftIcon
 */
export const ChevronLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <polyline points="15 18 9 12 15 6" />
        </svg>
    )
);
ChevronLeftIcon.displayName = 'ChevronLeftIcon';

/**
 * ChevronRightIcon
 */
export const ChevronRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <polyline points="9 18 15 12 9 6" />
        </svg>
    )
);
ChevronRightIcon.displayName = 'ChevronRightIcon';

/**
 * ArrowLeftIcon
 */
export const ArrowLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    )
);
ArrowLeftIcon.displayName = 'ArrowLeftIcon';

/**
 * ArrowRightIcon
 */
export const ArrowRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    )
);
ArrowRightIcon.displayName = 'ArrowRightIcon';


// ============================================================================
// CONTACT ICONS
// ============================================================================

/**
 * MailIcon
 */
export const MailIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    )
);
MailIcon.displayName = 'MailIcon';

/**
 * PhoneIcon
 */
export const PhoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
);
PhoneIcon.displayName = 'PhoneIcon';

/**
 * LocationIcon (Map Pin)
 */
export const LocationIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
);
LocationIcon.displayName = 'LocationIcon';


// ============================================================================
// SOCIAL ICONS
// ============================================================================

/**
 * InstagramIcon
 */
export const InstagramIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    )
);
InstagramIcon.displayName = 'InstagramIcon';

/**
 * FacebookIcon
 */
export const FacebookIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    )
);
FacebookIcon.displayName = 'FacebookIcon';

/**
 * LinkedInIcon
 */
export const LinkedInIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
);
LinkedInIcon.displayName = 'LinkedInIcon';

/**
 * SlideshareIcon (Brand logo icon using the official Simple Icons SVG path)
 */
export const SlideshareIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, fill = "currentColor", ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill={fill}
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M3.222.21C1.762.21 1.06 1.337 1.06 2.497v7.883c-.53-.502-1.096-.15-1.058.295.038.439.59 1.546 1.436 2.517.843.968 1.924 1.776 2.94 2.268a11.19 11.19 0 00-.491 3.598c.09 1.096.378 1.95.903 2.75.918 1.407 2.32 1.985 3.674 1.985 1.209 0 2.494-.563 2.698-2.373v-4.694c1.308.552 3.47.363 4.47-.39.19-.14.326-.207.416-.113.095.09.106.166-.113.439a5.6 5.6 0 01-3.103 1.965l.008 2.72a2.532 2.532 0 002.543 2.446c1.64.015 2.48-.556 3.148-1.164.632-.567 1.399-1.754 1.558-3.243a10.128 10.128 0 00-.454-3.926 10.358 10.358 0 002.948-2.268C23.213 12.5 24 11.185 24 10.675c0-.51-.556-.782-1.036-.302V2.497c0-.824-.48-2.29-2.135-2.29zm.423 1.35H20.41c.756 0 1.17.28 1.17 1.224v8.904a8.73 8.73 0 01-3.555 1.534c-1.606.352-2.94.087-3.666.148-.718.06-1.428.529-1.296 1.79-.491-.154-1.236-.683-1.682-1.117-.438-.428-.87-.711-1.534-.692-1.013.03-1.663.102-2.57.01a9.656 9.656 0 01-4.838-1.786V2.78c0-.87.378-1.22 1.206-1.22zm4.497 4.988a2.994 2.994 0 100 5.987 2.993 2.993 0 000-5.983zm7.71 0a2.994 2.994 0 100 5.987 2.993 2.993 0 000-5.983z" />
        </svg>
    )
);
SlideshareIcon.displayName = 'SlideshareIcon';


// ============================================================================
// UTILITY ICONS
// ============================================================================

/**
 * SearchIcon
 */
export const SearchIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    )
);
SearchIcon.displayName = 'SearchIcon';

/**
 * DownloadIcon
 */
export const DownloadIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    )
);
DownloadIcon.displayName = 'DownloadIcon';

/**
 * CalendarIcon
 */
export const CalendarIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    )
);
CalendarIcon.displayName = 'CalendarIcon';

/**
 * ClockIcon
 */
export const ClockIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
);
ClockIcon.displayName = 'ClockIcon';

/**
 * ExternalLinkIcon
 */
export const ExternalLinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, title, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : "true"}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    )
);
ExternalLinkIcon.displayName = 'ExternalLinkIcon';