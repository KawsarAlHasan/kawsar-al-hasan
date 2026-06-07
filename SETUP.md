# Hero Section — Setup Guide

Complete installation and configuration instructions for the portfolio Hero section.

---

## Quick Start

### 1. Create Next.js Project

```bash
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd portfolio
```

### 2. Install All Dependencies

```bash
# Core animation & scroll
npm install framer-motion lenis @gsap/react gsap

# Theme switching
npm install next-themes

# Fonts
npm install geist

# Icons
npm install lucide-react react-icons

# Tailwind utilities
npm install clsx tailwind-merge class-variance-authority

# Form handling (for Contact section later)
npm install react-hook-form zod @hookform/resolvers

# Easter egg / confetti (for Skills section later)
npm install canvas-confetti
npm install --save-dev @types/canvas-confetti

# Tailwind animation plugin (required by shadcn/ui)
npm install --save-dev tailwindcss-animate

# Prettier with Tailwind class sorting
npm install --save-dev prettier prettier-plugin-tailwindcss
```

### 3. Initialize Shadcn/UI

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Zinc**
- CSS variables: **Yes**

Then add the components used in this section:
```bash
npx shadcn@latest add button badge card dialog tooltip separator tabs
```

### 4. Install Geist Font

The layout.tsx already uses `geist/font/sans` and `geist/font/mono`. These are available after installing the `geist` package. No Google Fonts API call needed — self-hosted automatically.

---

## File Placement

Copy each file from this delivery to its exact path in your project:

```
portfolio/
├── app/
│   ├── layout.tsx              ← Replace default
│   ├── page.tsx                ← Replace default  
│   ├── globals.css             ← Replace default
│
├── components/
│   ├── common/
│   │   └── MagneticButton.tsx  ← New file
│   └── sections/
│       └── hero/
│           ├── index.ts
│           ├── HeroSection.tsx
│           ├── HeroBackground.tsx
│           ├── HeroAvailabilityBadge.tsx
│           ├── HeroHeadline.tsx
│           ├── HeroRoleCycler.tsx
│           ├── HeroCTA.tsx
│           ├── HeroSocialLinks.tsx
│           ├── HeroTechBadges.tsx
│           ├── HeroProfile.tsx
│           └── HeroScrollIndicator.tsx
│
├── data/
│   └── hero.ts                 ← New file
│
├── hooks/
│   ├── useReducedMotion.ts     ← New file
│   └── useMousePosition.ts     ← New file
│
├── lib/
│   ├── animations.ts           ← New file
│   └── utils.ts                ← New file (or merge with existing)
│
├── types/
│   └── index.ts                ← New file
│
├── tailwind.config.ts          ← Replace with provided version
└── next.config.ts              ← Replace with provided version
```

---

## Replace Your Profile Image

In `HeroProfile.tsx`, find the comment block:

```tsx
{/*
  ── UNCOMMENT AND USE THIS when you have a real image:

  <Image
    src="/images/profile/YOUR_PROFILE_IMAGE.webp"
    alt="Kawsar Al Hasan — Full Stack Developer"
    fill
    priority
    ...
  />
*/}
```

Steps:
1. Add your photo to: `public/images/profile/photo.webp`
2. Recommended size: **480×560px** minimum, WebP format
3. Remove the placeholder `<div>` block entirely
4. Uncomment the `<Image>` block
5. Update the `src` and `alt` text

---

## Update Your Personal Data

Edit `data/hero.ts` to replace all placeholder content:

```typescript
export const heroData: HeroData = {
  name: "Your Full Name",          // ← Change this
  firstName: "Your",               // ← Change this
  lastName: "Name",                // ← Change this
  tagline: "Full Stack Developer", // ← Your tagline
  roles: [                         // ← Your cycling roles
    "Full Stack Developer",
    "Your Role 2",
    ...
  ],
  bio: "Your one-sentence bio...", // ← Your value prop
  availability: true,              // ← Set false if not available
  ctaPrimary: {
    label: "Let's Build Together",
    href: "#contact",              // ← Links to contact section
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/yourusername", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", icon: "linkedin" },
    ...
  ],
  techBadges: ["Your", "Tech", "Stack", "Here"],
};
```

---

## Dark/Light Mode

The portfolio defaults to **dark mode** (set in `layout.tsx`):

```tsx
<ThemeProvider defaultTheme="dark" ...>
```

To change default to light: `defaultTheme="light"`  
To follow system: `defaultTheme="system"`

A `ThemeToggle` component (to be built in the Navbar section) will use `next-themes`' `useTheme()` hook to switch modes.

---

## Tailwind Config Note

The `tailwind.config.ts` includes `tailwindcss-animate` in the plugins array but it's commented out. Uncomment it after installing:

```typescript
plugins: [
  require("tailwindcss-animate"), // ← Uncomment this
],
```

---

## Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Performance Notes

- All animations respect `prefers-reduced-motion` via `useReducedMotion()`
- The `HeroBackground` uses CSS-only ambient animations — no JS overhead
- Profile image uses `priority` prop (LCP optimization — loads before other images)
- Font loading uses `next/font` — zero layout shift, self-hosted
- All `framer-motion` animations use `once: true` (fire once, not on re-entry)

---

## Accessibility Checklist

- ✅ `<section>` has `aria-label`
- ✅ Role cycler has `aria-live="polite"` and `aria-label`
- ✅ Availability badge has `role="status"` and `aria-label`
- ✅ Social links have `aria-label` on each `<a>`
- ✅ All icon-only elements have `aria-hidden="true"` with text alternatives
- ✅ Focus-visible styles on all interactive elements
- ✅ Scroll indicator has `role="img"` and `aria-label`
- ✅ `prefers-reduced-motion` disables all animations globally
- ✅ Color contrast meets WCAG AA in both light and dark modes
- ✅ All images will have descriptive `alt` text (add when replacing placeholder)

---

## Next Section

When ready to build the next section, prompt:

> "Based on the previously defined portfolio architecture, generate only the **Navbar** component..."

or

> "Generate only the **About Section** component..."
