# Contributing Guide

Thank you for contributing to the JIGISHA 2026 website.

This document defines the architecture, development workflow, coding standards, performance requirements, and Git workflow that all contributors must follow.

---

# Table of Contents

- [Project Goals](#project-goals)
- [Performance Requirements](#performance-requirements)
- [Application Architecture](#application-architecture)
- [Folder Structure](#folder-structure)
- [Component Architecture](#component-architecture)
- [Naming Conventions](#naming-conventions)
- [Server and Client Components](#server-and-client-components)
- [Constants and Data Management](#constants-and-data-management)
- [Metadata Management](#metadata-management)
- [Icons](#icons)
- [Images](#images)
- [Styling Guidelines](#styling-guidelines)
- [Accessibility Requirements](#accessibility-requirements)
- [Animation Guidelines](#animation-guidelines)
- [Performance Guidelines](#performance-guidelines)
- [TypeScript Guidelines](#typescript-guidelines)
- [Function Writing](#function-writing)
- [Git Workflow](#git-workflow)
- [Branch Naming](#branch-naming)
- [Commit Message Format](#commit-message-format)
- [Pull Request Guidelines](#pull-request-guidelines)

---

# Project Goals

The JIGISHA website is designed to be:

- Fast
- Accessible
- Responsive
- SEO-friendly
- Easy to maintain
- Easy for future organizing teams to extend

Every contribution should prioritize maintainability and performance over complexity.

---

# Performance Requirements

Minimum acceptable Lighthouse scores:

| Category | Score |
|-----------|--------|
| Performance | 95+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

Target:

```text
100 / 100 / 100 / 100
```

Contributors must avoid changes that significantly impact these metrics.

---

# Application Architecture

The application follows a strict hierarchy:

```text
Route
↓
Page Component
↓
Section Components
↓
Reusable Components
```

Example:

```tsx
app/page.tsx
```

```tsx
<HomePage />
```

```tsx
<PageWrapper>
    <Navbar />
    <HomeHero />
    <HomeAccordion />
    <Footer />
</PageWrapper>
```

Pages should assemble sections.

Sections should assemble reusable components.

Avoid placing large amounts of UI directly inside route files.

---

# Folder Structure

```text
jigisha-five/
├── app/
│   ├── page.tsx
│   ├── events/page.tsx
│   ├── sponsors/page.tsx
│   └── layout.tsx
│
├── components/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── EventsPage.tsx
│   │
│   ├── sections/
│   │   ├── homepage/
│   │   │   ├── HomeHero.tsx
│   │   │   └── HomeAccordion.tsx
│   │   │
│   │   └── events/
│   │       ├── EventHeader.tsx
│   │       └── EventTimeline.tsx
│   │
│   ├── wrappers/
│   │   ├── PageWrapper.tsx
│   │   └── SectionWrapper.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   └── icons/
│       ├── Icons.tsx
│       └── SocialIcons.tsx
│
├── constants/
│   ├── NavigationData.ts
│   └── Metadata.ts
├── hooks/
├── lib/
├── styles/
└── types/
```

---

# Component Architecture

Route files should remain minimal.

Example:

```tsx
// app/page.tsx

import HomePage from "@/components/pages/HomePage";

export default function Page() {
    return <HomePage />;
}
```

Example page component:

```tsx
<PageWrapper>
    <Navbar />
    <HomeHero />
    <HomeAccordion />
    <Footer />
</PageWrapper>
```

Page components orchestrate sections.

Sections orchestrate reusable UI components.

---

# Naming Conventions

## Components

Use PascalCase.

```tsx
<HomePage />
<Navbar />
<EventCard />
<HomeHero />
```

File names:

```text
HomePage.tsx
EventCard.tsx
NavigationMenu.tsx
```

---

## Functions

Use camelCase.

```tsx
getEventData()
calculateScore()
formatDate()
```

---

## Variables

Use camelCase.

```tsx
eventList
navigationItems
sponsorData
```

---

# Server and Client Components

By default:

```tsx
Server Components
```

Only use:

```tsx
"use client";
```

when required.

Examples:

- State management
- Browser APIs
- Event listeners
- Interactive animations

Do not convert entire pages into client components unnecessarily.

If only one section requires client-side interactivity, isolate that section into its own client component.

---

# Constants and Data Management

Static content must be stored inside:

```text
constants/
```

Examples:

```text
NavigationData.ts
EventData.ts
SponsorData.ts
SocialLinks.ts
```

Do not hardcode large content blocks inside components.

Components should consume data from constants.

---

# Metadata Management

All metadata must be managed through:

```text
constants/Metadata.ts
```

Examples:

```tsx
homeMetadata
eventsMetadata
sponsorsMetadata
```

Avoid duplicating metadata definitions across pages.

---

# Icons

External icon libraries are not allowed.

Not allowed:

```text
lucide-react
react-icons
heroicons
```

Use:

```text
components/icons/
```

SVG icons should be maintained internally.

This improves consistency and bundle size.

---

# Images

Always use:

```tsx
import Image from "next/image";
```

Avoid:

```html
<img />
```

unless absolutely necessary.

---

## Image Requirements

All images must:

- Include alt text
- Include width and height
- Be optimized before upload
- Use modern formats where possible

Preferred formats:

```text
1. AVIF
2. WebP
3. PNG
4. JPG
```

---

## Image Optimization

Avoid:

- Large image files
- Uncompressed screenshots
- Full-resolution photos

Use responsive sizing and proper image loading strategies.

Provide loading states where necessary.

---

# Styling Guidelines

All styling must use Tailwind CSS.

Fonts should be exposed through utility classes.

Examples:

```text
font-heading
font-body
font-caption
```

Avoid:

- Inline styling
- Random font declarations
- Inconsistent spacing values

---

# Accessibility Requirements

All contributions must maintain accessibility standards.

Required:

- Semantic HTML
- Proper heading hierarchy
- Keyboard accessibility
- Sufficient color contrast
- Alt text for images
- Proper button labels
- Proper link labels

---

# Animation Guidelines

Prefer CSS-based animations.

Allowed:

- Fade
- Slide
- Scale
- Hover effects

Avoid:

- Heavy parallax
- Continuous animations
- Expensive scroll effects
- Large animation libraries

Animations should enhance content, not distract from it.

---

# Performance Guidelines

Avoid:

- Large dependencies
- Heavy image assets
- Background videos
- Unnecessary client-side rendering

Use:

- Server Components
- Next.js Image Optimization
- Route-level code splitting
- Caching where applicable

Maps should not be embedded directly via raw iframes.

If a map is required, use the approved map rendering solution and provide an appropriate loading state.

---

# TypeScript Guidelines

Avoid:

```ts
any
```

Avoid:

```ts
@ts-ignore
```

unless absolutely necessary and documented.

Use proper types wherever possible.

---

# Function Writing

All server actions, database operations, API handlers, and helper functions must follow robust error-handling and logging procedures.

Guidelines:

- **Error Boundaries**: Wrap relevant code segments in `try-catch` blocks to capture and handle runtime exceptions gracefully.
- **Action Logging**: For every major action (including successful execution with `200` status, client-side validation errors with `400` status, or internal server errors with `500` status), display descriptive logs in the console to facilitate debugging.
- **Traceability**: Console output must clearly state the function/action name and current context along with the logged data or error object.
- **Visual Log Indicators**: Even simple operations and checks should include tick (✅) and cross (❌) emoji-based logs to make stdout logs easy to scan.

---

# Git Workflow

Never work directly on:

```text
main
```

Never push directly to:

```text
main
development
```

Workflow:

```text
Pull latest development
↓
Create feature branch
↓
Implement changes
↓
Push branch
↓
Create Pull Request
↓
Review
↓
Merge
```

If merge conflicts occur:

```text
Do not force merge.
Inform the maintainers.
```

---

# Branch Naming

Use descriptive names.

Examples:

```text
feature/create-navbar
feature/home-hero
feature/events-page

fix/mobile-navigation
fix/footer-links

docs/update-contributing
```

---

# Commit Message Format

Husky validation is enabled.

Required format:

```text
#issueno message - YYYY-MM-DD
```

Example:

```text
#12 Create responsive navbar - 2026-06-10

#27 Add sponsors section - 2026-06-10

#31 Fix mobile layout overflow - 2026-06-10
```

Commits that do not follow the required format may be rejected.

---

# Pull Request Guidelines

Before opening a Pull Request:

- Pull latest changes
- Ensure project builds successfully
- Ensure lint checks pass
- Test on desktop
- Test on mobile
- Verify Lighthouse requirements are maintained

After creating the PR:

- Do not merge your own PR
- Wait for review
- Address review comments
- Resolve requested changes

If conflicts occur, notify the maintainers before proceeding.